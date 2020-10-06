import styled, {css} from 'styled-components'

const inverted = css`
    border: 1px solid black;
    color: black;
    background-color: white;

    &:hover {
      color: white;
      background-color: black;
      border: none;
    }
`

const googleSignIn = css`
    background-color: #4285f4;
    border: none;
    color: white;

    &:hover {
      background-color: #357ae8;
    }
`


const customButtonStyles = css`
  background-color: black;
  color: white;
  border: none;
  
  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`

const getStyles = props => {
    if (props.inverted) {
        return inverted
    }

    return props.isGoogleSignIn ? googleSignIn : customButtonStyles
}

const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  justify-content: center;
  ${getStyles}
`

export default CustomButtonContainer