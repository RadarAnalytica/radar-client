import SideNav from "../components/SideNav"
import TopNav from "../components/TopNav"
import styles from "./AIDescriptionGenerator.module.css"

const AiDescriptionGeneratorPage = () => {
    return <div className='dashboard-page'>
        <SideNav />
        <div className='dashboard-content pb-3'>
            <TopNav title={'Генерация описания AI'} />
            <div></div>
        </div>
    </div >
}
export default AiDescriptionGeneratorPage