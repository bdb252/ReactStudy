import { useState } from "react";
import { Link } from "react-router-dom";
import '../css/catboard.css';

function CatList(props) {

  const lists = props.catData.map((row)=>{
  return (
      <tr key={row.no}>
        <td className="cen">
          <img src={row.img} alt={row.title} className="cat-img"/></td>
        <td className="cen"><Link to={"nyaong/"+row.no}>{row.title}</Link></td>
        {/* <td className="cen">{row.writer}</td> */}
        {/* <td className="cen">{row.date}</td> */}
      </tr>
    );
  });

  return (<>
    <h2>고양이 이야기</h2>
    <article>
      <table id="boardTable">
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
          </tr>
        </thead>
        <tbody>
          {lists}
        </tbody>
      </table>
    </article>
  </>)
}
export default CatList;