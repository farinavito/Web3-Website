import 'bulma/css/bulma.css'
import contractVault from '../blockchain/web'
import { useState, useEffect } from 'react'
import styles from '../styles/application.module.css'
import Head from 'next/head'
import Web3 from 'web3'
import Link from 'next/link'


const App = () => {

    const [error, setError] = useState('')
    const [errorVault, setErrorVault] = useState('')
    const [ids, setIds] = useState('')

    let web3

    useEffect(() => {
      
    })

    const getVaultsIds = async () => {
      const accounts = await web3.eth.getAccounts()
      try {
        const _ids = await contractVault.methods.getMyNumSafes().call({from: accounts[0]})
        setIds(_ids)
      }
      catch(err) {
        setErrorVault(err.message)
      }
    }

    const connectWalletHandler = async () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
            //metamask installed
            try {
                await window.ethereum.request({ method: "eth_requestAccounts"})
                web3 = new Web3(window.ethereum)
                getVaultsIds()
            } catch(err) {
                setError(err.message)
            }
            
        } else {
            //metamask not installed
            alert("Please install MetaMask")
        }
    }

    return (
        <div className={styles.main}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <nav className="navbar is-primary is-fixed-top has-background-black-bis">
                <div className="navbar-menu">
                    <div className="container">
                        <div className="navbar-brand">
                        <div className='navbar-item'></div>
                        <div className='navbar-item'></div>
                        <div className='navbar-item'></div>
                        <div className='navbar-item'></div>
                        <div className='navbar-item'>
                            <Link href='/'>
                                <a><h1>A web app</h1></a>
                            </Link>
                        </div> 
                        </div>
                    </div> 
                </div>
                
                <div className="navbar-end">
                    <div className='navbar-item'>
                        <Link href='/why'>
                            <a>Why</a>
                        </Link>
                    </div>
                </div>
                <div className="navbar-end">
                    <div className='navbar-item'>
                        <Link href='/how-it-works'>
                            <a>How it works</a>
                        </Link>
                    </div>
                </div>
                <div className="navbar-end">
                    <div className='navbar-item'>
                        <Link href='/use-cases'>
                            <a>Use cases</a>
                        </Link>
                    </div>
                </div>
                <div className="navbar-end">
                    <div className='navbar-item'>
                        <Link href='/statistic'>
                            <a>Statistic</a>
                        </Link>
                    </div>
                </div>
                <div className='navbar-end'>
                    <div className='navbar-item'>
                        <button onClick={connectWalletHandler} className="button ">Connect wallet</button>
                    </div>
                </div>
                     <div className='navbar-item'>
                </div>
            </nav>

            
            <section>
                <div className="container">
                    <p>Text</p>
                </div>
            </section>
            <section>
                <div className="container has-text-danger">
                    <p>{error}</p>
                </div>
            </section>

            <section className="hero has-background-black-bis is-fullheight pr-6">
                <div className="hero-body py-0 pr-6 mr-6">
                  <div className="container has-text-centered pr-6">
                    <div className="columns  pr-6">
                      <div id='sidebar' className="column py-0">
                        <p className=" has-background-black-bis pt-5 pb-3 mb-5 pr-6 has-text-primary">
                          <h2>Smart contracts</h2><br></br><br></br>
                          <p className="box has-background-black-bis pt-4 pb-3">
                            <div className='columns is-centered'>
                              <Link href="/lex-1">
                                <button className="button is-outlined py-2 px-6 is-size-6">Lex-1 </button>
                              </Link>
                            </div>
                          </p>
                          <p className="box has-background-black-bis pt-4 pb-3">
                            <div className='columns is-centered'>
                              <Link href="/lex-2">
                                <button className="button is-outlined py-2 px-6 is-size-6">Lex-2 </button>
                              </Link>
                            </div>
                          </p>
                          <p className="box has-background-black-bis pt-4 pb-3">
                            <div className='columns is-centered'>
                              <Link href="/vault">
                                <button className="button is-outlined py-2 px-6 is-size-6">Vault </button>
                              </Link>
                            </div>
                          </p>
                          <p className=" has-background-black-bis py-4 pr-6 is-size-6">
                            <br></br><br></br><br></br><br></br><br></br>
                          </p>
                          <p className=" has-background-black-bis py-4 pr-6 is-size-6">
                            <br></br><br></br><br></br><br></br><br></br>
                          </p>
                        </p>
                      </div>
                      <div className="column"></div>
                      <div className="column mt-6  pt-6 ">
                        <p className="subtitle has-background-black-bis pt-6 pb-3 mb-3 has-text-primary">
                          DEPOSIT<br></br><br></br>
                          <p className="has-background-black-bis py-4 is-size-6">
                            <br></br>
                          </p>
                          <input type="number" placeholder="Enter the locked up time" className='has-background-primary input is-normal'></input>
                          <p className=" has-background-black-bis py-4 is-size-6">
                            <br></br><br></br><br></br><br></br><br></br>
                          </p>
                          <p className="box has-background-black-bis pt-3 pb-3 mt-3">
                            <div className='columns is-centered'>
                              <Link href="">
                                <button className="button is-outlined py-2 px-6 is-size-6">Deposit </button>
                              </Link>
                            </div>
                          </p>
                        </p>
                      </div>
                      <div className="column mt-6 pt-6">
                        <p className="subtitle has-background-black-bis pt-6 pb-3 mb-3 has-text-primary">
                          WITHDRAW<br></br><br></br>
                          <p className=" has-background-black-bis py-4 is-size-6">
                            <br></br>
                          </p>
                          <input type="number" placeholder="Enter the id from My funds" className='has-background-primary input is-normal'></input>
                          <p className=" has-background-black-bis py-4 is-size-6">
                            <br></br>
                          </p>
                          <input type="number" placeholder="Enter the withdrawn quantity" className='has-background-primary input is-normal input-placeholder-color:black'></input>
                          <p className="box has-background-black-bis pt-4 pb-3 mt-6">
                            <div className='columns is-centered'>
                              <Link href="">
                                <button className="button is-outlined py-2 px-6 is-size-6">Withdraw </button>
                              </Link>
                            </div>
                          </p>
                        </p>
                      </div>
                      <div className="column mt-6 pt-6" >
                        <p className="subtitle has-background-black-bis pt-6 pb-3 mb-3 has-text-primary">
                          MY FUNDS<br></br><br></br> 
                          
                          <p>Your contract's ids: {ids}</p><p>{errorVault}</p>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>                         
            </section>
        </div>
        
    )
}

export default App