import SearchBar from "./SearchBar";
import Logo from "./Logo";
import "./Header.css"

function Header(){
    return (
      <header className="header">
          <div className="header-content">
        <Logo/>
        <SearchBar />
    </div>
    </header>
    )
}

export default Header