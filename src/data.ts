import { TableTypes } from "./types/TableTypes";
const temp =[
  {
    key: 1,
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: 2,
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
]
if(temp.length && !localStorage.getItem("tableList")){
  localStorage.setItem("tableList", JSON.stringify(temp) );
}

const data:TableTypes[] = JSON.parse(localStorage.getItem('tableList') ?? '[]')


export default data