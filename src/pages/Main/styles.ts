import styled from 'styled-components'

export const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  section {
    flex: 1;
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    padding: 2rem 1.875rem;

    img {
      width: 2rem;
    }
}
`

export const Container2 = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  margin-top: 0.2rem;

  @media (max-width: 720px) {
      display: flex;
      flex-direction: column;
      width: 414px;
      height: 400px;

      img {
        width: 0.2px;
        height: 1.5rem;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        margin-bottom: 0;
        margin: 0.3rem;
      }
    }
`

export const Container3 = styled.main`
  width: 99.1%;
  height: 5rem;
  margin-top: 1rem;
  margin-left: 1rem;
`

