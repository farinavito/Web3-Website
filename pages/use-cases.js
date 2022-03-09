import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Cases.module.css'

const Cases = () => {
    return(
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
                        <Link href='/Use cases'>
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
                        <Link href='/application'>
                            <a>Enter app</a>
                        </Link>
                    </div>
                    <div className='navbar-item'>
                    </div>
                </div>
            </nav>

            <section id='first' className="hero is-medium has-background-black-bis">
                <div className="hero-body">
                  <div className="container has-text-centered">
                    <text className="title">
                    Buy and sell goods
                    </text>
                    <p className="has-text-left pb-6 pt-4 pl-5 mt-5">
                        <h2>The purpose</h2>
                        Improving individual's and community's financial position by providing a worldwide system where buyers and sellers can exchange goods without trusting eachother. 

                        <h2 >How to achieve the above?</h2>
                        By using smart contracts, we can create trust between buyer and the seller. The latter will be penalized if he/she doesn't send physical or virtual goods to the buyer. 
                        Also, the smart contracts will make sure that the buyer sends the money for the purchase first. 
                        This is how the seller will be protected from the buyer's malice intentions.
                        
                        <h2 >What goods will you be able to sell and buy?</h2>
                        Any physical and virtual goods from any country in the world. No exception. 
                        We have spent a lot of time considering enabling a feature that can blacklist addresses. 
                        Our fear was that our system will be used for selling and buying illegal goods or services.
                        However, we have decided to take out this feature. Why? 
                        We believe that we could be pressured to blacklist an address not because of illegal activity, but because of political, ideological or other reason.
                        Our official statement is that we don't support selling and buying illegal goods and services and we are against it.
                        However, we are more concerned of the government's regimes unabling people to exchange goods and services with others, due to whatever reason than people using our system for illegal activities.
                        Therefore, we could be legally pressured to take down the website, however, the smart contracts will stay the same and active. 
                        This means that the system will outlive any political or legal pressure that could be forced on us.

                        <h2 >When will this feature be implemented?</h2>
                        We can't provide any exact date. However, we are trying to provide it as soon as possible.

                        <h2 >Which blockchains will be used to deploy the smart contracts?</h2>
                        Firstly, the smart contracts will be deployed on the Ethereum mainnet. 
                        After some time we will deploy them to other Ethereum L2 scaling solutions.  
                        We haven't yet decided which scalin solutions will be used.

                        <h2 >How much commission will we charge?</h2>
                        A feature in the smart contract lets us to change the commission from 1 to 10**15 weis. 
                        This enables us to respond to rapid changes in supply and demand of our system and other events in the world.
                        The exact commission amount can be checked for a specific smart contract.
                    </p>
                  </div>
                </div>
            </section>

            <section id="second" className="hero is-medium has-background-black-bis">
                <div className="hero-body">
                  <div className="container has-text-centered">
                    <text className="title">
                    Buy and sell services
                    </text>
                    <p className="has-text-left pb-6 pt-4 pl-5 mt-5">
                        <h2>The purpose</h2>
                        Improving individual's and community's financial position by providing a worldwide system where sellers can provide services and buyers can subscribe to them. 
                        Both parties don't need to know or trust eachother. 

                        <h2 >How to achieve the above?</h2>
                        By using smart contracts, we can create trust between buyer and the seller. 
                        The latter will be penalized if he/she breaches the terms that they had initially provided. 
                        Also, the buyer will be penalized if he/she breaches the terms of services he/she have agreed to. 
                        This is how the seller will be protected from the buyer's malice intentions. All the logic will be handled by the smart contracts.
                        
                        <h2 >What services will you be able to sell and buy?</h2>
                        Any physical and virtual goods from any country in the world. No exception. 
                        We have spent a lot of time considering enabling a feature that can blacklist addresses. 
                        Our fear was that our system will be used for selling and buying illegal goods or services.
                        However, we have decided to take out this feature. Why? 
                        We believe that we could be pressured to blacklist an address not because of illegal activity, but because of political, ideological or other reason.
                        Our official statement is that we don't support selling and buying illegal goods and services and we are against it.
                        However, we are more concerned of the government's regimes unabling people to exchange goods and services with others, due to whatever reason than people using our system for illegal activities.
                        Therefore, we could (will) be legally pressured to take down the website, however, the smart contracts will stay the same and active. 
                        This means that the system will outlive any political or legal pressure that could be forced on us.

                        <h2 >When will this feature be implemented?</h2>
                        We can't provide any exact date. However, we are trying to provide it as soon as possible.

                        <h2 >Which blockchains will be used to deploy the smart contracts?</h2>
                        Firstly, the smart contracts will be deployed on the Ethereum mainnet. 
                        After some time we will deploy them to other Ethereum L2 scaling solutions.  
                        We haven't yet decided which scalin solutions will be used.

                        <h2 >How much commission will we charge?</h2>
                        A feature in the smart contract lets us to change the commission from 1 to 10**15 weis. 
                        This enables us to respond to rapid changes in supply and demand of our system and other events in the world.
                        The exact commission amount can be checked for a specific smart contract.
                    </p>
                  </div>
                </div>
            </section>

            <section id='third' className="hero is-medium has-background-black-bis">
                <div className="hero-body">
                  <div className="container has-text-centered">
                    <text className="title">
                    Legal agreements
                    </text>
                    <p className="has-text-left pb-6 pt-4 pl-5 mt-5">
                        <h2>The purpose</h2>
                        Enabling people to have access to creation of legal agreements with other subjects in their community or worldwide.

                        <h2 >How to achieve the above?</h2>
                        By using smart contracts, we make sure that subjects who don't know eachother and 
                        don't have physical access to one another, fulfill their obligations to eachother 
                        without cheating the system.

                        <h2 >What kind of legal agreements will be implemented?</h2>
                        We will ask our community to help us find the most usefull legal agreements for them.

                        <h2 >When will these features be implemented?</h2>
                        We can't provide any exact date. However, we are trying to provide it as soon as possible.

                        <h2 >Which blockchains will be used to deploy the smart contracts?</h2>
                        Firstly, the smart contracts will be deployed on the Ethereum mainnet. 
                        After some time we will deploy them to other Ethereum L2 scaling solutions.  
                        We haven't yet decided which scalin solutions will be used.  

                        <h2 >How much commission will we charge?</h2>
                        A feature in the smart contract lets us to change the commission from 1 to 10**15 weis. 
                        This enables us to respond to rapid changes in supply and demand of our system and other events in the world.
                        The exact commission amount can be checked for a specific smart contract.
                    </p>
                  </div>
                </div>
            </section>

            <section id='forth' className="hero is-medium has-background-black-bis">
                <div className="hero-body">
                  <div className="container has-text-centered">
                    <text className="title mb-6">
                    Financial commitments
                    </text>
                    <p className="has-text-left pb-6 pt-4 pl-5 mt-5">
                        <h2>The purpose</h2>
                        Enabling people to create financial agreements with other subjects all over the world.

                        <h2 >How to achieve the above?</h2>
                        By using smart contracts, we make sure that subjects who don't know eachother and 
                        don't have physical access to one another, fulfill their obligations to eachother 
                        without cheating the system.

                        <h2 >What kind of financial agreements will be implemented?</h2>
                        Enabling person A to commit sending payment every X amount to person B every Y time period for the duration of Z time starting at Q.<br></br>
                        Enabling person A to commit sending a payment till T.<br></br>
                        Also, we are open to any suggestions fromour community.<br></br>

                        <h2 >When will these features be implemented?</h2>
                        We have already deployed a smart contract enabling person A to commit sending payment 
                        every X amount to person B every Y time period for the duration of Z time starting at Q.
                        In the short future we will deploy a smart contract that will enable subjects to commit sending a payment till T.

                        <h2 >Which blockchains will be used to deploy the smart contracts?</h2>
                        Firstly, the smart contracts will be deployed on the Ethereum mainnet. 
                        After some time we will deploy them to other Ethereum L2 scaling solutions.  
                        We haven't yet decided which scalin solutions will be used.

                        <h2 >How much commission do we charge?</h2>
                        A feature in the smart contract lets us to change the commission from 1 to 10**15 weis. 
                        This enables us to respond to rapid changes in supply and demand of our system and other events in the world.
                        The exact commission amount can be checked for a specific smart contract.
                    </p>
                  </div>
                </div>
            </section>

        </div>
        
    )
}

export default Cases