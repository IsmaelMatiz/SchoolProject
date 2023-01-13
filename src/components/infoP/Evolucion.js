import React from 'react'
import InfoP from './InfoP'
import { Bar } from 'react-chartjs-2'
import { BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Legend, Tooltip } from 'chart.js'


const data= [
  {nombre: 'Maria', edad: 15, weight: 60},
  {nombre: 'Sofia', edad: 30, weight: 70},
  {nombre: 'Saul', edad: 25, weight: 65},
  {nombre: 'Danna', edad: 17, weight: 85},
  {nombre: 'Carlos', edad: 19, weight: 48},
  {nombre: 'Juliana', edad: 12, weight: 69},
  {nombre: 'Dayana', edad: 21, weight: 78},  
]

const Evolucion = () => {
  return (
    <div>
      <InfoP />
      <h2>Evolución del Paciente</h2>
      <ResponsiveContainer width="70%" aspect={2}>
        <BarChart 
          data={data} 
          width={500} 
          height={300} 
          margin= {{top:5, right:30, left:20, bottom:5
          
          }} 
        >
          <CartesianGrid strokeDasharray="4 1 2"/>
          <XAxis dataKey="nombre"/>
          <YAxis/>
          <Tooltip/>
          <Legend/>
          <Bar dataKey= "weight"/>
          <Bar dataKey= "edad"/>

        </BarChart>
      </ResponsiveContainer>

    </div>
    
  );
}

export default Evolucion
