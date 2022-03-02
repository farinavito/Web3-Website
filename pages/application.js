import 'bulma/css/bulma.css'
import styles from '../styles/application.module.css'
import Head from 'next/head'
import Web3 from 'web3'

const App = () => {

    let web3;

    const connectWalletHandler = () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
            //metamask installed
            window.ethereum.request({ method: "eth_requestAccounts"})
            web3 = new Web3(window.ethereum)
        } else {
            //metamask not installed
            alert("Please install MetaMask")
        }
    }

    return(
        <div className={styles.main}>
            <Head>
            <title>Create Next App</title>
            <meta name="description" content="A web3 app" />
            </Head>
            <nav className="navbar mt-4 mb-4">
                <div className="container">
                    <div className="navbar-brand">
                        <h1>A web app</h1>
                    </div>
                    <div className="navbar-end">
                        <button onClick={connectWalletHandler} className="button is-primary">Connect wallet</button>
                    </div>
                </div>
            </nav>
            <section>
                <div className="container">
                    <p>Text</p>
                </div>
            </section>
        </div>
        
    )
}

export default App