import 'bulma/css/bulma.css'
import vaultContract from '../blockchain/webVault'
import { useState, useEffect } from 'react'
import styles from '../styles/application.module.css'
import Head from 'next/head'
import Web3 from 'web3'
import Link from 'next/link'


const App = () => {
    //storing error message when there is an error for connecting to the metamask
    const [error, setError] = useState('')
    //storing the web3 instance
    const [web3, setWeb3] = useState(null)
    //storing the address of the person who connected their wallet
    const [address, setAddress] = useState(null)
    //storing the copy of the smart contract
    const [contractVault, setContractVault] = useState(null)
    
    //storing the caller's time lock for deposit
    const [depositTimeLock, setDepositTimeLock] = useState('')
    //storing the caller's deposit quantity
    const [depositQty, setDepositQty] = useState('')
    //storing error message when there is an error for calling deposit
    const [errorDeposit, setErrorDeposit] = useState('')

    //storing the caller's withdraw ids
    const [withdrawId, setWithdrawId] = useState('')
    //storing the caller's withdraw quantity
    const [withdrawQty, setWithdrawQty] = useState('')
    //storing error message when there is an error for calling withdraw
    const [errorWithdraw, setErrorWithdraw] = useState('')
    
    //storing the quantity of caller's vault ids
    const [ids, setIds] = useState('')
    //storing error message when there is an error for retrieving number of ids from getMyNumSafes
    const [errorVault, setErrorVault] = useState('')
    //storing the caller's ids of the vaults
    const [myVaultsIds, setMyVaultsIds] = useState([])
    //storing the error message when trying to get all the caller's vault ids
    const [errorIds, setErrorIds] = useState('')

    //storing the error message when trying to get the caller's funds details
    const [errorFundsDetails, setErrorFundsDetails] = useState('')
    //storing the caller's funds details -> id
    const [detailsId, setDetailsId] = useState([])
    //storing the caller's funds details -> signee
    const [detailsSignee, setDetailsSignee] = useState([])
    //storing the caller's funds details -> balances
    const [detailsBalances, setDetailsBalances] = useState([])
    //storing the caller's funds details -> lockedUpTime
    const [detailsLockedUpTime, setDetailsLockedUpTime] = useState([])
    

    //when the copy of the smart contract is available, call getMyNumVaults() and getMyVaultsIds()
    useEffect(() => {
      if (contractVault) getMyVaultsIds()
      if (contractVault) getMyNumVaults()
      if (contractVault) getFundsDetails()
    }, [contractVault])

    //storing the number of Vaults the caller has
    const getMyNumVaults = async () => {
      try {
        const _ids = await contractVault.methods.getMyNumSafes().call({from: address})
        setIds(_ids)
      }
      catch(err) {
        setErrorVault(err.message)
        setIds(0)
      }
    }
    
    //storing the caller's vaults ids
    const getMyVaultsIds = async () => {
      try {
        setMyVaultsIds('')
        for (let i = 0; i < ids; i++) {
          const newId = await contractVault.methods.mySafes(address, i).call({from: address})
          setMyVaultsIds(arr => [...arr, newId])
        }
      }
      catch(err) {
        setErrorIds(err.message)
      }
    }

    //setting the input's variable of caller's time lock from the deposit section 
    const updateDepositTimeLock = event => {
      setDepositTimeLock(event.target.value)
    }

    //setting the input's variable of caller's deposit quantity from the deposit section 
    const updateDepositQty = event => {
      setDepositQty(event.target.value)
      
    }

    //creating a deposit
    const depositFunds = async () => {
      try {
        //every time initialize the error's useState to zero
        setErrorDeposit('')
        //if the address is not connected
        if (address == null){
          setErrorDeposit('Please connect your wallet')
        }
        //check the smart contracts require statement fails
        else if (depositQty == 0){
          setErrorDeposit('You must deposit more than 0 weis')
        //call the deposit function
        } else {
          await contractVault.methods.deposit(depositTimeLock).send({
            from: address,
            value: web3.utils.toWei('1', 'wei') * depositQty
          }).then(
            e => {
              //if the transaction succeeds
              if(e['status'] == true){
                setErrorDeposit("Transaction succeeded")
              }
            }
          )
        }
      //if the transaction fails
      } catch(err) {
        //TypeError
        if(err.message == "Cannot read properties of null (reading 'methods')"){
          setErrorDeposit("Please connect your wallet")
        //Error
        } else if (err.message == 'invalid BigNumber string (argument="value", value="", code=INVALID_ARGUMENT, version=bignumber/5.6.2)'){
          setErrorDeposit("Please enter all the info required")
        //undefined
        } else if (err.message == "MetaMask Tx Signature: User denied transaction signature."){
          setErrorDeposit("You have rejected the transaction")
        //Error
        } else{
          setErrorDeposit("Transaction failed")
        }
      }
    }

    //setting the input's variable of caller's withdrawing id
    const updateWithdrawId = event => {
      setWithdrawId(event.target.value)
    }

    //setting the input's variable of caller's withdrawing quantity from the withdraw section
    const updateWithdrawQty = event => {
      setWithdrawQty(event.target.value)
    }

    //check if the withdrawn's requirements aren't breached
    const checkRequirementsWithdraw = async (_id, _qty) => {
      try{
        //calling exactSafe()
        const ag_signee = await contractVault.methods.exactSafe(_id).call({from: address})
        //check if the agreement's signee is the same as the connected address
        if (ag_signee.signee == address){
          //check if the locked up time is smaller than current unix timestamp
          if (ag_signee.lockedUpTime < Math.floor(Date.now() / 1000)){
            //check if the balance of the agreement is larger than withdrawn amount
            if(ag_signee.balances >= _qty){
              return true
            } else {
              setErrorWithdraw("Your want to withdraw more than it's stored in the agreement")
              return false
            }
          } else {
            setErrorWithdraw("Your locked up time hasn't ended yet")
            return false
          } 
        } else {
          setErrorWithdraw("You aren't the agreement's signee")
          return false
        }
      }catch(err) {
        //Error
        if (err.message == 'invalid BigNumber string (argument="value", value="", code=INVALID_ARGUMENT, version=bignumber/5.6.2)'){
        setErrorWithdraw("Please enter all the info required")
        }
      }
      
      
    }

    //withdrawing deposit
    const withdrawFunds = async () => {
      try {
        setErrorWithdraw('')
        const qty = web3.utils.toWei('1', 'wei') * withdrawQty
        if (checkRequirementsWithdraw(withdrawId, qty) == true){
          await contractVault.methods.withdraw(withdrawId, qty).send({
            from: address
          }).then(
            e => {
              if(e['status'] == true){
                setErrorWithdraw("Transaction succeeded")
              }
            }
          )
        }         
      } catch(err) {
        //TypeError
        if(err.message == "Cannot read properties of null (reading 'utils')"){
          setErrorWithdraw("Please connect your wallet")
        //Error
        } else if (err.message == 'invalid BigNumber string (argument="value", value="", code=INVALID_ARGUMENT, version=bignumber/5.6.2)'){
          setErrorWithdraw("Please enter all the info required")
        //undefined
        } else if (err.message == "MetaMask Tx Signature: User denied transaction signature."){
          setErrorWithdraw("You have rejected the transaction")
        //Error
        } else{
          setErrorWithdraw("Transaction failed")
        }
      }
    }

    const allDetails = [];
    const allDetailsSingleVault = [];

    //getting the caller's funds details
    const getFundsDetails = async () => {
      try {
        for (const value of myVaultsIds.values()) {
          const newId = await contractVault.methods.exactSafe(value).call({from: address})
          const vault = {
            id: newId.id, 
            signee: newId.signee,
            balances: newId.balances,
            time: newId.lockedUpTime
          }
          //allDetailsSingleVault.push(newId.id, newId.signee, newId.balances, newId.lockedUpTime)
          //allDetailsSingleVault.push(vault)
          //console.log(allDetailsSingleVault);
          //allDetails.push(allDetailsSingleVault)
          allDetails.push(vault)
          //allDetails.push(newId)
          
          
          allDetailsSingleVault= []
        }  
        //console.log(allDetails);    
      } catch(err) {
        setErrorFundsDetails(err.message)
      }
    }

    const connectWalletHandler = async () => {
      //checking if metamask is available
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
        //metamask installed
        try {
          //request wallet connect - metamask pop up window
          await window.ethereum.request({ method: "eth_requestAccounts"})
          //set web3 instance
          web3 = new Web3(window.ethereum)
          setWeb3(web3)
          //list of all accounts
          const accounts = await web3.eth.getAccounts()
          //web3.eth.handleRevert = true

          //set the variable to the first account
          setAddress(accounts[0])
          //local copy of the smart contract
          const localContract = vaultContract(web3)
          setContractVault(localContract)
          //set the error handler to empty string after connecting the wallet
          setErrorDeposit('')
          //set the error handler to empty string after connecting the wallet
          setErrorWithdraw('')
          
        } catch(err) {
          setError(err.message)
        }    
      } else {
          //metamask not installed
          alert("Please install MetaMask")
      }
    }

    const bla = [
      {balances: "0", id: "1", signee: "0x143C026113f4BE894F49bbb9d51A4a66cc7e7107", time: "1656882473"},
      {balances: "10", id: "2", signee: "0x143C026113f4BE894F49bbb9d51A4a66cc7e7107", time: "1656882473"},
      {balances: "490", id: "3", signee: "0x143C026113f4BE894F49bbb9d51A4a66cc7e7107", time: "1656882473"},
      {balances: "22", id: "4", signee: "0x143C026113f4BE894F49bbb9d51A4a66cc7e7107", time: "1656882473"},
    ]

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
                    <h2>{error}</h2>
                </div>
            </section>

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
                              <Link href="/payment">
                                <button className="button is-outlined py-2 px-5 is-size-6">Payment </button>
                              </Link>
                            </div>
                          </div>
                          <div className="box has-background-black-bis pt-4 pb-3">
                            <div className='columns is-centered'>
                              <Link href="/deposits">
                                <button className="button is-outlined py-2 px-5 is-size-6">Deposits </button>
                              </Link>
                            </div>
                          </div>
                          <p className=" has-background-black-bis py-4 pr-6 is-size-6">
                            <br></br><br></br><br></br><br></br><br></br>
                          </p>
                          <p className=" has-background-black-bis py-4 pr-6 is-size-6">
                            <br></br><br></br><br></br><br></br><br></br>
                          </p>
                        </div>
                      </div>
                      <div className="column"></div>
                      <div className="column mt-6  pt-6 ">
                        <div className="subtitle has-background-black-bis pt-6 pb-3 mb-3 has-text-primary">
                          DEPOSIT<br></br><br></br>
                          <p className="has-background-black-bis py-4 is-size-6">
                          </p>
                          <input onChange={updateDepositTimeLock} type="number" min="1" placeholder="Enter the locked up time" className='has-background-primary input is-normal'></input>
                          <p className=" has-background-black-bis py-4 is-size-6">
                            <br></br><br></br><br></br>
                            <input onChange={updateDepositQty} type="number" placeholder="Enter the amount you want to lock" className='has-background-primary input is-normal'></input>
                          </p>
                          <br></br>
                          <p className='max-class'>{errorDeposit}</p>
                          <div className="box has-background-black-bis pt-4 pb-3 mt-6">
                            <div className='columns is-centered'>
                              <Link href="">
                                <button onClick={depositFunds} className="button is-outlined py-2 px-6 is-size-6">Deposit </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="column mt-6 pt-6">
                        <div className="subtitle has-background-black-bis pt-6 pb-3 mb-3 has-text-primary">
                          WITHDRAW<br></br><br></br>
                          <p className=" has-background-black-bis py-4 is-size-6">
                          </p>
                          <input onChange={updateWithdrawId} type="number" min="1" placeholder="Enter the id from My funds" className='has-background-primary input is-normal'></input>
                          <p className=" has-background-black-bis py-4 is-size-6">
                            <br></br><br></br><br></br>
                            <input onChange={updateWithdrawQty} type="number" min="1" placeholder="Enter the withdrawn quantity" className='has-background-primary input is-normal input-placeholder-color:black'></input>
                          </p><br></br>
                          <p className='max-class'>{errorWithdraw}</p>
                          <div className="box has-background-black-bis pt-4 pb-3 mt-6">
                            <div className='columns is-centered'>
                              <Link href="">
                                <button onClick={withdrawFunds} className="button is-outlined py-2 px-6 is-size-6">Withdraw </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="column mt-6 pt-6" >
                        <div className="subtitle has-background-black-bis pt-6 pb-3 mb-3 has-text-primary">
                          MY FUNDS<br></br><br></br> 
                          
                          <p className='max-class'>Number of vaults you have: <br></br><br></br>{ids}</p>
                          <p className='max-class'>Your vault's ids: <br></br><br></br>{myVaultsIds}</p>
                          <br></br>
                          <p className='max-class'>
                            <br></br>{errorIds}
                            <br></br>{errorVault}
                          </p>
                          <br></br>
                          <p className='max-class'>Vault's details: </p>
                          <br></br>
                          {allDetails.map(({id, signee, balances, time}) => (
                            <div>
                              <p>
                                Id: {id}<br></br>
                                Signee: {signee}<br></br>
                                Balances: {balances}<br></br>
                                Lock Time{time}<br></br>
                              </p> 
                            </div>
                          ))}
                          
                          <p>{errorFundsDetails}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>                         
            </section>

            <footer>
              <section className="hero is-small has-background-black-bis">
                <div className="hero-body">
                </div>
              </section>
            </footer>

        </div>
        
    )
}

export default App