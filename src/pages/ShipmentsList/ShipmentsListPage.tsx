import { Row } from 'reactstrap'

import ChartCard from '../../components/Card/ChartCard/ChartCard'
import PersonsCard from '../../components/Card/PersonsCard/PersonsCard'
import TasksCard from '../../components/Card/TasksCard/TasksCard'
import { BarChart } from '../../components/Charts/BarChart/BarChart'
import { LineChart } from '../../components/Charts/LineChart/LineChart'
import ShipmentsTable from '../../components/ShipmentsTable/Table'

const ShipmentsListPage = () => {
  return (
    <>
      <ShipmentsTable />
      {/* Mock Data */}
      <div className='p-4'>
        <Row>
          <ChartCard category={'Global Sales'} title={'Shipped Products'}>
            <LineChart />
          </ChartCard>
          <ChartCard category={'2021 Sales'} title={'All products'}>
            <BarChart />
          </ChartCard>
        </Row>
        <Row>
          <TasksCard />
          <PersonsCard />
        </Row>
      </div>
    </>
  )
}

export default ShipmentsListPage
