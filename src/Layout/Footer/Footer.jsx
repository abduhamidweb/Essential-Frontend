import "./footer.scss";
import logo from "../../assets/images/Logo.png";
import ru from "../../assets/images/ru.png";
import HeaderLink from "../../components/HeaderLink/HeaderLink";
const Footer = () => {
    return (
        <>
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <a href="#">
                                <img width={141} height={31} src={logo} alt="img" />
                            </a>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <ul>
                                <HeaderLink txt={"Главная"} clas={""} />
                                <HeaderLink txt={"Меню"} clas={""} />
                                <HeaderLink txt={"Контакты"} clas={""}/>
                            
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="lang ">
                                <button className='btn navbar-right-btn'><img src={ru} alt="rus" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;