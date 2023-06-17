import Button, { ButtonProps } from 'react-bootstrap/esm/Button'
import { BiSortAlt2 } from 'react-icons/bi'

import { SortingType } from '../../../store/filters/types'

// interface SortButtonProps extends BsPrefixRefForwardingComponent<'button', ButtonProps> {  // ! type error?
interface SortButtonProps extends ButtonProps {
  sortingType: SortingType
  sortTypeName: SortingType
}
const SortButton = ({ sortingType, sortTypeName, ...restProps }: SortButtonProps) => {
  const isSortingActive = sortingType === sortTypeName

  return (
    <Button
      variant='light'
      className='px-1 py-0 ms-3 lh-1 bg-transparent border-0'
      title={`Sort by ${sortTypeName}`}
      {...restProps}
    >
      <BiSortAlt2 opacity={isSortingActive ? 1 : 0.3} className='my-1' />
    </Button>
  )
}

export default SortButton
