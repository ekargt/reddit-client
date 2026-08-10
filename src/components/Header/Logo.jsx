import clientLogo from "../../assets/clientLogo.png"
import "./Logo.css"

function Logo(){
    return (
        <div className="logo-wrapper">
            <img 
                src={clientLogo} 
                className="client-logo"
                alt="Reddit client logo"
            />
        </div>
    )
}
export default Logo