import { PieChart, Pie, Cell,Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042","#8FCF47","#b1faf2"];


const RADIAN = Math.PI / 180;

export default function Piechart(props:any) {
  if(!props.data){
    return <></>;
  }
  return (
    <>
   
    <h4 className="text-center">{props.label}{props.handle}</h4>
    <PieChart width={props.width} height={props.height}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={props.data}
        cx={props.cx}
        cy={props.cy}
        outerRadius={props.outerRadius}
        innerRadius={props.innerRadius}
        fill="#8884d8"
        label
      >
        
       {props.data.map((entry:any, index:any) => ( <Cell key={`cell-${index}`} fill={COLORS[index%COLORS.length]} /> ))}
      </Pie>
      <Tooltip />
    </PieChart>
    </>
    
  );
}
