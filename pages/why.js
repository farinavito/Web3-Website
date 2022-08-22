import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Why.module.css'

const Why = () => {
    return(
        <div className={styles.main}>
            <Head>
                <title>Alt World</title>
                <meta name="Alt World" content="Alternative World" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            

            <nav className="navbar has-background-black-bis is-fixed-top">
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
                <div className="navbar-end">
                  <div className='navbar-item'>
                    <Link href='/application'>
                        <a>Enter app</a>
                    </Link>
                  </div>
                  <div className='navbar-item'></div>
                </div>
            </nav>

            <section className="hero is-fullheight has-background-black-bis">
                <div className="hero-body">
                  <div className="container has-text-centered">
                    <h3 className="title">
                        Why? Simple, we want to help communities to flourish
                    </h3>
                    <article className="has-text-centered pt-4">
                        <br></br>
                        <h2>Firstly,</h2>we believe by enabling members of community to work together without trusting one another, <br></br>
                        will enable communities to thrive in ways we or maybe even the communities cannot imagine. <br></br>
                        This potential of what communities could achieve keeps us on the track of constantly building. <br></br>
                        <br></br>
                        <h2>Secondly,</h2>we want to create a system which doesn't discriminate and where everybody is treated equally, <br></br>
                        no matter of their gender, sex orientation, political orientation, country of origin or nationality. <br></br>
                        No one should be excluded from having access to legal and financial tools, because of the above.<br></br>
                        <br></br>
                        <h2>Thirdly,</h2>we want to add our small piece of puzzle in creating a better world where we want to live in, our world.<br></br> 
                        We are inspired by an old, really famous in the internet community and for us still relevant document:<br></br>
                        A Declaration of Independence of Cyberspace from John Perry Barlow, 1996. If you haven't, please read it.<br></br>
                        <br></br>
                        <h2>Fourthly,</h2>we do understand there are bad people with ill intentions in this world. We have created this website in good faith<br></br>
                        to be used for good. Because "good" can have different meaning in different communities, we imply on you: <br></br>
                        Treat others as you want to be treated. It's so much easier to destroy than to build. Please, remember that.<br></br>
                        <br></br>
                    </article>
                  </div>
                </div>
            </section>
        </div>
        
    )
}

export default Why