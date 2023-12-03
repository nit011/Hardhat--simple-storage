// we want to able to test all of our solidity code locally, so that we know exactly what its doing  and we have programmatic way to make sure that our code  does what we want it to do 

// hardhat testing works with the Mochqa framework, which  is a javascripts based framework for running our test 

 //we are going to write describe function 
 // describe  is a keyword that hardhat mocha will recognize and it take two parameter 
  // it takes string and then also takes a function 
  
 //describe("SimpleStorage",function() {} )
 // describe("SimpleStorage", () => {})  upper bala decleartion or niche bala dono same hai 

 // we have describe a sample storage and  then our function here , which is going to have all of our test in it 

 const {ethers}= require("hardhat")
 const {expect,assert}=require("chai")
 
 describe("SimpleStorage",function() {
    // inside each one of our describe block we are gonna have something called a (beforeEach) and a bunch of (its)) our beforeeach function is going to tell us what to do before each of our  it it it it
    //let simpleStorageFactory
    //let simplestorage
    let simpleStorageFactory,simpleStorage
    beforeEach(async function() {
         simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
         simpleStorage = await simpleStorageFactory.deploy()
    })
    
    it( "should start with a favorite number of 0", async function(){
        const currentvalue=await simpleStorage.retrieve()
        const expectedvalue="1"
        //assert
        //expect
        assert.equal(currentvalue.toString(),expectedvalue)
        // expect(currentValue.toString()).to.equal(expectedValue)
    })
    it("Should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)
    
        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
      })
       // Extra - this is not in the video
  it("Should work correctly with the people struct and array", async function () {
    const expectedPersonName = "Nitish"
    const expectedFavoriteNumber = "16"
    const transactionResponse = await simpleStorage.addPerson(
      expectedPersonName,
      expectedFavoriteNumber
    )
    await transactionResponse.wait(1)
    const { favoriteNumber, name } = await simpleStorage.people(0)
    // We could also do it like this
    // const person = await simpleStorage.people(0)
    // const favNumber = person.favoriteNumber
    // const pName = person.name

    assert.equal(name, expectedPersonName)
    assert.equal(favoriteNumber, expectedFavoriteNumber)
  })
 } )

