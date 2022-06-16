import Head from 'next/head'
import styles from '../styles/Statistic.module.css'
import 'bulma/css/bulma.css'
import Link from 'next/link'

const Statistic = () => {

    return(
        <div className={styles.main}>
            <nav className="navbar has-background-black-ter is-fixed-top">
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
                <div className="navbar-end">
                  <div className='navbar-item'>
                    <Link href='/community'>
                        <a>Community</a>
                    </Link>
                  </div>
                </div>
                <div className="navbar-end">
                  <div className='navbar-item'>
                    <Link href='/application'>
                        <a>Enter app</a>
                    </Link>
                  </div>
                  <div className='navbar-item'>
                  </div>
                </div>
            </nav>

            <section className="hero is-fullheight has-background-black-bis">
                <div className="hero-body">
                  <div className="container has-text-centered">
                    <p>
                        UNDER CONSTRUCTION
                        
                    </p>
                  </div>
                </div>
            </section>

        </div>
    )
}

export default Statistic