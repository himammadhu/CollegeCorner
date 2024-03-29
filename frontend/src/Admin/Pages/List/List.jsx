import './List.scss'
import SideBar from '../../components/sidebar/SideBar'
import NavBar from '../../components/navbar/NavBar'
import DataTable from '../../components/datatable/DataTable'

const List = () => {
  return (
    <div className='list'>
      <SideBar />
      <div className="listContainer">
        <NavBar />
        <div className="datatable">
          <DataTable/>
        </div>
      </div>
    </div>
  )
}

export default List
