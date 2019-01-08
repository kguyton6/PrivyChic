import React from 'react'
import styled from 'styled-components'
import Button from '../buttons/Button'

const StyledButton = styled(Button)`
    font-size: 12px;
    padding: 10px;
    background-color: white;
    color: aqua;
    border: thin solid aqua;
`

class Availability extends React.Component {

    render(){
        return (
            <>

                  <StyledButton 
                    onClick={() =>
                      this.props.onClick
                    }
                  >
                    Check Availability
                  </StyledButton>
            </>
        )
    }
}

export default Availability
