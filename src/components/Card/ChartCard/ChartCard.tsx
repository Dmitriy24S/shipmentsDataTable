import { CgOptions } from 'react-icons/cg'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from 'reactstrap'

interface Props {
  category: string
  title: string
  children: React.ReactNode
}

const ChartCard = ({ category, title, children }: Props) => {
  const chartId = title.split(' ').join('-')

  return (
    <Col xs={12} md={6}>
      <Card className='card-chart'>
        <CardHeader>
          <h5 className='card-category'>{category}</h5>
          <CardTitle tag='h4'>{title}</CardTitle>
          <UncontrolledDropdown id={chartId}>
            <DropdownToggle className='px-1 py-0 focus-ring' color='default'>
              <CgOptions size={22} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem>Something else here</DropdownItem>
              <DropdownItem className='text-danger'>Remove data</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledTooltip delay={0} target={chartId}>
            Edit Chart
          </UncontrolledTooltip>
        </CardHeader>
        <CardBody>{children}</CardBody>
        <CardFooter>
          <div className='stats'>
            <i className='now-ui-icons arrows-1_refresh-69' /> Just Updated
          </div>
        </CardFooter>
      </Card>
    </Col>
  )
}

export default ChartCard
