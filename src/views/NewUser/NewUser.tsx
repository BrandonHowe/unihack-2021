import { useNavigate } from "react-router-dom";
import "./NewUser.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { tree } from "../TreePage/TreePage";
import { findNodeByName } from "../../helpers";

export default function NewUserPage() {
    const [grade, setGrade] = useState(8);
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (grade === 8) {
            tree.nodes[0].complete = true;
            findNodeByName("Systems of Equations")!.complete = true;
            navigate("/tree");
        }
    }

    return <div className="newUserPage">
        <div className="newUserLogo">
            <img src={logo} alt="Logo" />
        </div>
        <div style={{ width: 700, margin: "auto" }}>
            <h2 style={{ fontSize: 48, fontWeight: "bold" }}>Welcome to KnowledgeTree!</h2>
            <h4 style={{ fontSize: 20, fontWeight: "normal" }}>Before you begin using KnowledgeTree, please enter the most recent grade level you completed so we can better assess which modules you need to work on.</h4>
            <div style={{ width: 330, textAlign: "left", margin: "auto" }}>
                <label htmlFor="gradeLevel">Grade level</label>
                <br />
                <select id="gradeLevel" onChange={e => setGrade(Number(e.target.value))}>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                    <option value={11}>11</option>
                    <option value={12}>12</option>
                </select>
            </div>
            <div className="newUserSubmit" onClick={handleSubmit}>Submit</div>
        </div>
    </div>
}