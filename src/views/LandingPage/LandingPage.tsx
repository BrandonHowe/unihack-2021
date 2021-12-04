import { Link } from "react-router-dom";
import "./LandingPage.css";
import logo from "../../assets/logo.png";
import math from "../../assets/math.png";
import knowledge from "../../assets/knowledge.png";
import microscope from "../../assets/microscope.png";

function LandingPageModule({ name, image, description, url }: { name: string, url: string, image: string, description: string }) {
    return <div className="landingPageModule">
        <h2 className="landingPageModuleName">{name}</h2>
        <div className="landingPageModuleRow">
            <img src={image} alt="Module" />
            <div className="landingPageModuleDesc">
                <p>{description}</p>
                <Link className="landingPageModuleDescLink" to={url} style={{ textAlign: "right" }}>Check out now</Link>
            </div>
        </div>
    </div>
}

export default function LandingPage() {
    return <div className="landingPage">
        <div className="landingPageLogo">
            <img src={logo} alt="Logo" />
        </div>
        <h5 style={{ fontSize: 18 }}>Discover what knowledge you are missing and put it all together. No more barriers or secrets.<br />The knowledge tree of the world is in your hands.</h5>
        <Link to="/newUser" style={{ textDecoration: "none", color: "inherit" }}><div className="landingPageCheckOutButton">Get started</div></Link>
        <h5 style={{ fontSize: 18 }}>Or check out our modules directly...</h5>
        <div className="landingPageModuleList">
            <LandingPageModule image={math} name="Mathematics" description="Full curriculum available right now, from Algebra and Geometry to Matrices and Calculus." url="/" />
            <LandingPageModule image={microscope} name="Biology" description="Full curriculum available right now, from environmental biology to full body anatomy." url="/" />
            <LandingPageModule image={knowledge} name="Physics" description="Full curriculum available right now, from kinematics to rotational motion." url="/" />
        </div>
    </div>
}