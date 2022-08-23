import 'bulma/css/bulma.css'
import styles from '../styles/application.module.css'
import Head from 'next/head'
import Link from 'next/link'

const App = () => {

    return (
        <div className={styles.main}>
            <Head>
                <title>Alt World</title>
                <meta name="Alt World" content="Alternative World" />
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
                                <a><h1>Alt World</h1></a>
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
                        <Link href='/use-cases'>
                            <a>Use cases</a>
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
                        <Link href='/statistic'>
                            <a>Statistic</a>
                        </Link>
                    </div>
                </div>
                <div className='navbar-item'></div>
                <div className='navbar-item'></div>
                <div className='navbar-item'></div>
                <div className='navbar-item'></div>
                <div className='navbar-item'></div>
                
            </nav>           

            <section className="hero has-background-black-bis is-fullheight pr-6">
                <div className="hero-body py-0 pr-6 mr-6">
                  <div className="container has-text-centered pr-6">
                    <div className="columns  pr-6">
                      <div id='sidebar' className="column py-0">
                        <div className=" has-background-black-bis pt-5 pb-3 mb-5 pr-6 has-text-primary">
                          <h2>Smart contracts</h2><br></br><br></br>
                          <div className="box has-background-black-bis pt-4 pb-3">
                            <div className='columns is-centered'>
                              <Link href="/installments">
                                <button className="button is-outlined py-2 px-3 is-size-6">Installments </button>
                              </Link>
                            </div>
                          </div>
                          <div className="box has-background-black-bis pt-4 pb-3">
                            <div className='columns is-centered'>
                              <Link href="/lex-2">
                                <button className="button is-outlined py-2 px-6 is-size-6">Lex-2 </button>
                              </Link>
                            </div>
                          </div>
                          <div className="box has-background-black-bis pt-4 pb-3">
                            <div className='columns is-centered'>
                              <Link href="/vault">
                                <button className="button is-outlined py-2 px-6 is-size-6">Vault </button>
                              </Link>
                            </div>
                          </div>
                          <div className=" has-background-black-bis py-4 pr-6 is-size-6">
                            <br></br><br></br><br></br><br></br><br></br>
                          </div>
                          <div className=" has-background-black-bis py-4 pr-6 is-size-6">
                            <br></br><br></br><br></br><br></br><br></br>
                          </div>
                        </div>
                      </div>
                      <div className="column"></div>
                      <div className="column py-0">
                        <div className="subtitle has-background-black-bis pt-5 pb-3 mb-3 has-text-primary">
                          1st commitments<br></br><br></br>
                          <div className=" has-background-black-bis py-4 is-size-6">
                            Fulfill your financial obligations<br></br>
                            to your contract's signees
                          </div>
                          <div className="box has-background-black-bis pt-4 pb-3">
                            <div className='columns is-centered'>
                              <Link href="/use-cases#second">
                                <button className="button is-outlined py-2 px-6 is-size-6">Details </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>                         
            </section>
        </div>
        
    )
}

export default App