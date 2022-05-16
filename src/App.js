import React from 'react'
import Legend from './Legend';
import './App.css'

export default function App()
{
    function importPXML() 
    {
        // const content = document.querySelector('.content');
        const [file] = document.querySelector('input[type=file]').files;
        const reader = new FileReader();
  
        reader.addEventListener("load", () => {
        // content.innerText = reader.result;
        processFileContent(reader.result)
        }, false);
  
        if (file) {
        reader.readAsText(file);
        }
    }
    
    const [points, setPoints] = React.useState([])

    function setDummy1(pointID, value)
    {
        console.log(`Dummy 1 set for point ${pointID} to ${value}`)
        const newPoints= points.map(point => pointID === point.id ? {...point, dummy1: value} : point)
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
        let zone='<ZONE>\n'
        for(var point of points)
        {
            zone = zone.concat(`\t<POINT x="${point.x}" y="${point.y}" dummy1="${point.dummy1}" dummy2="${point.dummy2}"/>\n`)
        }
        zone = zone.concat('</ZONE>')

        return zone
    }

    function downloadXML() 
    {
        var a = document.getElementById('a')
        var xml = createProcessedXML();
        console.log(xml)
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
              <td>{point.x}</td>
              <td>{point.y}</td>
              <td>{point.dummy1}</td>
              <td>{<Legend handleClick={setDummy1} id={point.id}/>}</td>
              <td>{point.dummy2}</td>
              <td>{<Legend handleClick={setDummy2} id={point.id}/>}</td>
            </tr>
      </>
    ))

    const contentsTable = (
      <table>
      <thead>
          <tr>
            <th>X</th>
            <th>Y</th>
            <th>Dummy 1</th>
            <th>Set Dummy 1</th>
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
            console.log(content)
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(content, 'text/xml');
            const points3 = xmlDoc.getElementsByTagName('SVertex')

            var doc = document.implementation.createDocument("", "", null)
            console.log(points3)
            const zoneElem = document.createElement("ZONE");
            doc.appendChild(zoneElem)

            var pointId = 0

            for(let point of points3) {
                pointId = pointId + 1
                console.log(`Point id is ${pointId}`)
                const newPoint = {
                  id: pointId,
                  x: point.children[0].textContent, 
                  y: point.children[1].textContent,
                  dummy1: 0,
                  dummy2: 0
                }
                setPoints(points2 => ([...points2, newPoint]))
                var pointElem = doc.createElement('POINT')
                pointElem.setAttribute('x', point.children[0].textContent)
                pointElem.setAttribute('y', point.children[1].textContent)
                
                zoneElem.appendChild(pointElem)
            }

            var xmlText = new XMLSerializer().serializeToString(doc)
            var xmlTextNode = document.createTextNode(xmlText)
            console.log(xmlTextNode)
            downloadXML()
    }
}
        // <tbody>{points}</tbody>