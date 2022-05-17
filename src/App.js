import React from 'react'
import Legend from './Legend';
import './App.css'

export default function App()
{
    function importPXML() 
    {
        const [file] = document.querySelector('input[type=file]').files;
        const reader = new FileReader();
  
        reader.addEventListener("load", () => {
        processFileContent(reader.result)
        }, false);
  
        if (file) 
        {
            reader.readAsText(file);
        }
    }
    
    const [points, setPoints] = React.useState([])

    function setOimpl(pointID, value)
    {
        console.log(`oimpl set for point ${pointID} to ${value}`)
        const newPoints= points.map(point => pointID === point.id ? {...point, oimpl: value} : point)
        setPoints(newPoints)
    }

    function setDummy2(pointID, value)
    {
        console.log(`Dummy 2 set for point ${pointID} to ${value}`)
        const newPoints= points.map(point => pointID === point.id ? {...point, dummy2: value} : point)
        setPoints(newPoints)
    }

    function createProcessedXML()
    {
      const allZones = points.map(point => point.zone)
      // console.log(points)
      const zonesSet = new Set(allZones)
      // console.log(zonesSet)
      if(zonesSet.size == 0) return
      const zones = Array.from(zonesSet)
      // console.log(`Zones: ${zones}`)
        let finalXML='<?xml version="1" standalone="yes" ?>\n'

        for(var zone of zones)
        {
          // console.log(`Zone: ${zone}`)
            finalXML = finalXML.concat(`<ZONE id=${zone}>\n`)

            const zonePoints = points.filter(point => point.zone == zone)
            for(var point of zonePoints)
            {
              console.log(`Zone: ${zone}, Point: ${point}`)
                finalXML = finalXML.concat(`\t<POINT x="${point.x}" y="${point.y}" oimpl="${point.oimpl}" dummy2="${point.dummy2}"/>\n`)
            }
            finalXML = finalXML.concat('</ZONE>\n')
        }

        return finalXML
    }

    function downloadXML() 
    {
        var a = document.getElementById('a')
        var xml = createProcessedXML();
        // console.log(xml)
        if(a)
        {
            var file = new Blob([xml], {type: 'text/xml'});
            a.href = URL.createObjectURL(file);
            a.download = 'processed.xml';
        }
        else
            console.log('No Anchor tag');
    }

    const result = points.map(point => (
      <>
            <tr>
              <td>{point.zone}</td>
              <td>{point.x}</td>
              <td>{point.y}</td>
              <td>{point.oimpl}</td>
              <td>{<Legend handleClick={setOimpl} id={point.id}/>}</td>
              <td>{point.dummy2}</td>
              <td>{<Legend handleClick={setDummy2} id={point.id}/>}</td>
            </tr>
      </>
    ))

    const contentsTable = (
        <table>
            <thead>
                <tr>
                    <th>Zone</th>
                    <th>X</th>
                    <th>Y</th>
                    <th>oimpl</th>
                    <th>Set oimpl</th>
                    <th>Dummy 2</th>
                    <th>Set Dummy 2</th>
                </tr>
            </thead>
        <tbody>
        {result}
        </tbody>
      </table>
    )

    return (
      <div>
          <header>Quadratic Solutions - XML Converter</header>
          {/* <Legend /> */}
          <label for="pxml">Choose a PXML file to process:</label>
          <input type='file' id='pxml' onChange={importPXML} />
          <br/>
          {/* <p>Raw PXML file contents:</p> */}
          {/* <textarea className='content'></textarea> */}
          <br/>
          {/* { points.length > 0 && <a href=''>Download file</a>} */}
          <p>PXML file contents to update:</p>
          {contentsTable}
          <hr></hr>
          { points.length > 0 && downloadXML(), <div className='dlink'><a href='' id="a">Download Processed XML File</a></div> }
          {/* <button onClick={downloadXML}>Create file</button> */}
          {/* <p>{xmlContent}</p> */}
        </div>
    )
    
    function processFileContent(content) 
    {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(content, 'text/xml');
        const zones = xmlDoc.getElementsByTagName('Slab')

        var zoneId = 0

        for(let zone of zones)
        {
            zoneId = zoneId + 1
            const points = zone.getElementsByTagName('SVertex')
                
            var pointId = 0

            for(let point of points) 
            {
              pointId = pointId + 1
              // console.log(`Point id is ${pointId}`)

              const newPoint = {
                zone: zoneId,
                id: pointId,
                x: point.children[0].textContent, 
                y: point.children[1].textContent,
                oimpl: 0,
                dummy2: 0
              }

              setPoints(prevPoints => ([...prevPoints, newPoint]))
          }

          downloadXML()

        }
    }
}