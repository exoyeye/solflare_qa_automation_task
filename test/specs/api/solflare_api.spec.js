const axios = require('axios');
const chai = require('chai');
const expect = chai.expect;
const _ = require('lodash');

const ADDRESS = "HuiTegTpNAU7EJXvn95HKEWBdFMtWZYko4yoFVQyCKUS"
const BASE_URL = `https://wallet-api.solflare.com/v3/portfolio/tokens/${ADDRESS}`
const AUTHORIZATION_HEADER = "Bearer d89b0f57-70d5-4cda-a45c-44568c798fdc"

const getResponse = async (network) => {
    try {
        const params = {};

        if(network){
            params.network = network;
        }

        const response = await axios.get(BASE_URL, {
            params: params,
            headers: { Authorization: AUTHORIZATION_HEADER }
        });
        expect(response.status).to.equal(200);
        return response.data;
    } catch (error) {
        if(error.response){
            console.log("Status code:", error.response.status)
            console.log("Error message:", error.response.data.data.message)
        }
        return error.response;
    }
};

describe('Test scenario 1: Devnet Token Validation', function() {
    let tokens;
    let totalUiAmount;

    before(async () => {
        response = await getResponse("devnet");
        tokens = response.tokens;
        totalUiAmount = tokens.reduce((acc, token) => acc + token.totalUiAmount, 0);
    })

    it('Validate that the response includes multiple tokens, not just SOL.', () => {

        expect(tokens.length).to.be.greaterThan(1, "There should be more than one token");
        expect(tokens.map(token => token.name)).to.contain("Solana", "Solana token is missing");

    });

    it('Confirm that the response contains tokens with a mint address.', () => {
        tokens.forEach(token => {
            expect(token.mint).to.be.a('string').and.not.be.empty;
        });
    });

    it('Ensure totalUiAmount for each token has valid values.', () =>{
        tokens.forEach(token => {
            expect(token.totalUiAmount >= 0)
        })

        expect(totalUiAmount).to.equal(response.value.total, "Total UI amount is not valid");
    });

    it('Validate the type of fields such as price, coingeckoId, and verify if they exist for each token.', () => {
        tokens.forEach(token => {
            expect(token).to.have.property('coingeckoId');

            if(token.coingeckoId){
                expect(token).to.have.property('price');
            }
        })
    });
})

describe('Test Scenario 2: SOL Token Validation', function() {
    let response;
    let tokens;

    before(async () => {
        response = await getResponse();
        tokens = response.tokens;
    })

    it('Validate that the response contains only solana.', () => {
        expect(tokens).to.have.lengthOf(1, "Only one token should be present");
        expect(tokens[0].name).to.be.equal('Solana', 'Token name should be Solana');
    });

    it('Verify the essential properties of the SOL token:', () =>{
        expect(tokens[0].name).to.be.equal('Solana', "Token name should be Solana");
        expect(tokens[0].symbol).to.be.equal('SOL', "Simbol should be SOL");
        expect(tokens[0].mint).to.be.equal('11111111111111111111111111111111', "Mint value is not valid");
        expect(tokens[0].totalUiAmount).to.be.equal(response.value.total);
    });

    it('Ensure the price object contains key values.', () => {
        expect(tokens[0].price).to.have.all.keys('price', 'change', 'usdPrice', 'usdChange', 'liquidity', 'volume24h', 'volumeChange24h', 'mc', 'currency');
    })
});

describe('Test Scenario 3: Break the API', function () {
    it('Attempt to generate an error by sending a GET request', async () => {
        response = await getResponse("DROP * FROM DB");
        expect(response.status).to.equal(400, "Status code should be 400");
        expect(response.data.data.message).to.equal('"network" must be one of [mainnet, devnet, testnet]', "Error message is not correct");
    })
});

describe('Test Scenario 4: Returning to Mainnet After Switching to Devnet', function () {
    let mainnetResponse;
    let devnetResponse;
    let mainnetSecondResponse;

    before(async () => {
        mainnetResponse = await getResponse("mainnet");
        devnetResponse = await getResponse("devnet");
        mainnetSecondResponse = await getResponse("mainnet");
    })

    it('Second Request (Devnet) - Validate that additional tokens appear in the response compared to mainnet.', () => {
        // check if solana token exists in Mainnet and Devnet
        const solTokenExistsInMainnet = mainnetResponse.tokens.some(token => token.name === "Solana");
        expect(solTokenExistsInMainnet).to.be.true;

        const solTokenExistsInDevnet = devnetResponse.tokens.some(token => token.name === "Solana");
        expect(solTokenExistsInDevnet).to.be.true;
        
        expect(devnetResponse.tokens.length).to.be.greaterThan(mainnetResponse.tokens.length);
    })

    it('Third Request (Back to Mainnet) - Ensure all token balances and details match the original mainnet response except the price.', () => {
        expect(
            mainnetResponse.tokens.map(token => _.omit(token, "price"))
        ).to.deep.equal(
            mainnetSecondResponse.tokens.map(token => _.omit(token, "price")))
    })
})