import React from 'react'
import Legend from './Legend';
import './App.css'

export default function App()
{
    function importPXML() 
    {
        const content = document.querySelector('.content');
        const [file] = document.querySelector('input[type=file]').files;
        const reader = new FileReader();
  
        reader.addEventListener("load", () => {
        // this will then display a text file
        content.innerText = reader.result;
        processFileContent(reader.result)
        }, false);
  
        if (file) {
        reader.readAsText(file);
        // processFileContent(reader.readAsText(file))
        }
    }
    
    const [points, setPoints] = React.useState([])
    const [xmlContent, setXMLContent] = React.useState('Temp')

    function showLegend() {
      console.log('Show legend')

    }

    function setDummy1(pointID, value)
    {
        console.log(`Dummy 1 set for point ${pointID} to ${value}`)
        const newPoints= points.map(point => pointID === point.id ? {...point, dummy1: value} : point)
        setPoints(newPoints)
    }

    const setButton  = <button onClick={showLegend}>Set Value</button>
    const result = points.map(point => (
    <tr>
      <td>{point.x}</td>
      <td>{point.y}</td>
      <td>{point.dummy1}</td>
      <td>{<Legend handleClick={setDummy1} id={point.id}/>}</td>
      <td>{point.dummy2}</td>
      <td>{<Legend/>}</td>
    </tr>
    ))
    return (
        <div>
          <header>Quadratic</header>
          {/* <Legend /> */}
          <input type='file' onChange={importPXML} />
          <textarea className='content'></textarea>
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
          <tbody>{result}</tbody>
          </table>
          <hr></hr>
          <p>{xmlContent}</p>
        </div>
    )
    
    function processFileContent(content) 
    {
        console.log('Processing file content')
            console.log(content)
        // console.log(content)
        // if(window.DOMParser)
        {
            console.log('Here')
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(content, 'text/xml');
            console.log('Parsed')
            // console.log(xmlDoc.getElementsByTagName('Slab')[0]);
            const points3 = xmlDoc.getElementsByTagName('SVertex')

            var doc = document.implementation.createDocument("", "", null)
            console.log(points3)
            const zoneElem = document.createElement("ZONE");
            doc.appendChild(zoneElem)

            var pointId = 0

            for(let point of points3) {
                pointId = pointId + 1
                // console.log(`Point id is ${pointId}`)
                setPoints(points2 => (
                  [...points2, 
                    {
                        id: pointId,
                        x: point.children[0].textContent, 
                        y: point.children[1].textContent,
                        dummy1: 0,
                        dummy2: 0
                    }
                  ]
                  ))
                var pointElem = doc.createElement('POINT')
                // console.log(`X: ${point.children[0].textContent}, Y: ${point.children[1].textContent}`)
                pointElem.setAttribute('x', point.children[0].textContent)
                pointElem.setAttribute('y', point.children[1].textContent)
                
                // console.log(point)
                zoneElem.appendChild(pointElem)
            }

            var outPoints = doc.getElementsByTagName('POINT')

            for(let point of points)
            {
              console.log(`Outpoints: ${point.id}`)
            }
            // setXMLContent(doc)
            // console.log(doc)
            var xmlText = new XMLSerializer().serializeToString(doc)
            var xmlTextNode = document.createTextNode(xmlText)
            console.log(xmlTextNode)
            // setXMLContent(xmlTextNode.wholeText)
            // console.log(zones[0].getElementsByTagName('SVertext')[0])
        } 
        // else
            // console.log('Hear hear')       
    }
}
        // <tbody>{points}</tbody>