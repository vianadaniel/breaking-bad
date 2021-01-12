import React from "react"
import axios from "axios"
import styled from "styled-components"

const Card = styled.div`
  border: 1px solid;
  border-radius: 50px 20px;

  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  background: #00aec9;
  color: #fff;
  align-items: center;
`
const Header = styled.section`
  background: #00aec9;
  color: #fff;
  border: 1px solid;
  border-radius: 50px 20px;
  height: 60px;
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  margin: 20px 30px;
`
const Search = styled.input`
 background: white;
  color: #00aec9;
  cursor: pointer;
  margin-bottom: 0;
  
  height: 35px;
  border-color: transparent;
  box-shadow: 0px;
  outline: none;
  transition: 0.15s;
  text-align: center;
  border-radius: 50px 20px;
  &:active {
    background-color: #f1ac15;
  

`

const CardBox = styled.div`
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  display: flex;

  flex-wrap: wrap;
`

const Imagem = styled.img`
  border: 1px solid;
  border-radius: 50px 20px 0px 0px;
  width: 200px;
  height: 250px;
`

class App extends React.Component {
  state = {
    lista: [],
    text: "",
  }

  pegarLista = () => {
    axios
      .get("https://www.breakingbadapi.com/api/characters")
      .then((resposta) => {
        this.setState({ lista: resposta.data })
      })
      .catch((erro) => {
        console.log(erro)
      })
  }

  componentDidMount() {
    this.pegarLista()
  }

  getText = (event) => {
    this.setState({ text: event.target.value })
  }

  render() {
    const atorList = this.state.lista

      .filter((ator) => {
        return ator.name.toLowerCase().indexOf(this.state.text) >= 0
      })

      .map((ator) => {
        return (
          <Card>
            <Imagem src={ator.img} alt="" />
            <p key={ator.char_id} value={ator.name}>
              {ator.name}
            </p>
          </Card>
        )
      })

    return (
      <div>
        <Header>
          <Search onChange={this.getText} />
        </Header>
        <CardBox>{atorList}</CardBox>
      </div>
    )
  }
}
export default App
