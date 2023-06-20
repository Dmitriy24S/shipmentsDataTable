import { useState } from 'react'
import { CgOptions } from 'react-icons/cg'
import { IoCloseSharp } from 'react-icons/io5'
import { TbRefresh } from 'react-icons/tb'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Label,
  Table,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from 'reactstrap'

import styles from '../Card.module.scss'

const tasks = [
  {
    id: 1,
    text: 'Identify and resolve operational inefficiencies to streamline processes',
  },
  {
    id: 2,
    text: 'Provide training and guidance to new team members on company systems and protocols',
  },
  {
    id: 3,
    text: 'Generate sales leads and follow up with potential clients to drive revenue growth',
  },
  {
    id: 4,
    text: 'Develop and execute a social media marketing campaign to increase brand awareness',
  },
]

const TasksCard = () => {
  const [spinningUpdate, setSpinningUpdate] = useState(false)

  const toggleUpdate = () => {
    setSpinningUpdate(true)

    setTimeout(() => {
      setSpinningUpdate(false)
    }, 3000)
  }

  return (
    <Col xs={12} md={6}>
      <Card className={`${styles.card} ${styles.listCard}`}>
        <CardHeader>
          <CardTitle tag='h4'>Tasks</CardTitle>
        </CardHeader>
        <CardBody className={styles.body}>
          <div className='table-full-width table-responsive'>
            <Table>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={task.id}>
                    <td>
                      <FormGroup check={index !== 2}>
                        <Input
                          id={task.text}
                          defaultChecked={index !== 2}
                          type='checkbox'
                        />
                        <span className='form-check-sign' />
                      </FormGroup>
                    </td>
                    <td className='text-left'>
                      <Label htmlFor={task.text}>{task.text}</Label>
                    </td>
                    <td className='td-actions text-right'>
                      {/* Edit */}
                      <UncontrolledDropdown id={`edit-${task.id}`}>
                        <DropdownToggle color='primary' className='py-0 px-1 mb-2'>
                          <CgOptions size={16} />
                        </DropdownToggle>
                        <DropdownMenu end>
                          <DropdownItem>Action</DropdownItem>
                          <DropdownItem>Another Action</DropdownItem>
                          <DropdownItem>Something else here</DropdownItem>
                          <DropdownItem className='text-danger'>Remove data</DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      <UncontrolledTooltip delay={0} target={`edit-${task.id}`}>
                        Edit Task
                      </UncontrolledTooltip>
                      {/* Delete */}
                      <Button
                        type='button'
                        id={`remove-${task.id}`}
                        color='danger'
                        className='py-0 px-1'
                      >
                        <IoCloseSharp size={16} />
                      </Button>
                      <UncontrolledTooltip delay={0} target={`remove-${task.id}`}>
                        Remove
                      </UncontrolledTooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
        <CardFooter>
          <div className='stats d-flex align-items-center'>
            <Button
              onClick={toggleUpdate}
              className='p-0 bg-transparent border-0 text-secondary me-1'
            >
              <TbRefresh size={16} className={`${spinningUpdate ? styles.spin : ''}`} />
            </Button>
            Updated 3 minutes ago
          </div>
        </CardFooter>
      </Card>
    </Col>
  )
}

export default TasksCard
