
"use strict";


(function(exports){


    exports.scoreDiv = document.querySelector("div.scoreboard") // Find the scoreboard div in our html
    let tableHeaders = ["Global Ranking", "Username", "Score", "Time Alive [seconds]", "Accuracy [%]"]

    exports.createScoreboardTable = () => {
        while (scoreDiv.firstChild) scoreDiv.removeChild(scoreDiv.firstChild) // Remove all children from scoreboard div (if any)

        let scoreboardTable = document.createElement('table') // Create the table itself
        scoreboardTable.className = 'scoreboardTable'

        let scoreboardTableHead = document.createElement('thead') // Creates the table header group element
        scoreboardTableHead.className = 'scoreboardTableHead'

        let scoreboardTableHeaderRow = document.createElement('tr') // Creates the row that will contain the headers
        scoreboardTableHeaderRow.className = 'scoreboardTableHeaderRow'

        tableHeaders.forEach(header => {
            let scoreHeader = document.createElement('th') // Creates the current header cell during a specific iteration
            scoreHeader.innerText = header
            scoreboardTableHeaderRow.append(scoreHeader) // Appends the current header cell to the header row
        })

        scoreboardTableHead.append(scoreboardTableHeaderRow) // Appends the header row to the table header group element
        scoreboardTable.append(scoreboardTableHead)
        let scoreboardTableBody = document.createElement('tbody') // Creates the table body group element
        scoreboardTableBody.className = "scoreboardTable-Body"
        scoreboardTable.append(scoreboardTableBody) // Appends the table body group element to the table
        scoreDiv.append(scoreboardTable) // Appends the table to the scoreboard div
    }


    // The function below will accept a single score and its index to create the global ranking
    exports.appendScores = (singleScore, singleScoreIndex) => {
        const scoreboardTable = document.querySelector('.scoreboardTable') // Find the table we created
        let scoreboardTableBodyRow = document.createElement('tr') // Create the current table row
        scoreboardTableBodyRow.className = 'scoreboardTableBodyRow'

        // Lines 72-85 create the 5 column cells that will be appended to the current table row
        let scoreRanking = document.createElement('td')
        scoreRanking.innerText = singleScoreIndex
        let usernameData = document.createElement('td')
        usernameData.innerText = singleScore.user.username
        let scoreData = document.createElement('td')
        scoreData.innerText = singleScore.score
        let timeData = document.createElement('td')
        timeData.innerText = singleScore.time_alive
        let accuracyData = document.createElement('td')
        accuracyData.innerText = singleScore.accuracy
        scoreboardTableBodyRow.append(scoreRanking, usernameData, scoreData, timeData, accuracyData) // Append all 5 cells to the table row
        scoreboardTable.append(scoreboardTableBodyRow) // Append the current row to the scoreboard table body
    }

    // staking   https://fcd.terra.dev/v1/staking/terra1nps9aq9h645fqylr0lsu0cz0uj0j3mudch5j64
    // transactions  https://fcd.terra.dev/v1/txs?offset=0&limit=100&account=terra1nps9aq9h645fqylr0lsu0cz0uj0j3mudch5j64



    exports.getScores = (walletAddress) => {
        fetch(
            `https://fcd.terra.dev/v1/bank/${walletAddress}`,
            {
                method: 'GET',
                timeout: 30000,
                mode: "cors",
                agent: "",
                headers: {
                    passcode: '5a102a34f60fa7ec9d643a8a0e72cab9',
                    'ape-secret': 'U2FsdGVkX1/mMwcXP1tVTeVxm+AkSfrzpWbovzKmyHcc4c8/N7iy6/JmRqtuMj3BPp0/A3ihRa8dddyZWTBG/9j6unKTmv1Wcqnr9v8IrPPe2TaqXbuh+tRH80UwfFzqmzcXKEqy1k59Fg0ooy6wvg=='
                }
            }
        ) // Fetch for all scores. The response is an array of objects that is sorted in decreasing order
        .then(res => res.json())
        .then(scores => {
            createScoreboardTable() // Clears scoreboard div if it has any children nodes, creates & appends the table
            // Iterates through all the objects in the scores array and appends each one to the table body
            for (const score of scores) {
                let scoreIndex = scores.indexOf(score) + 1 // Index of score in score array for global ranking (these are already sorted in the back-end)
                appendScores(score, scoreIndex) // Creates and appends each row to the table body
            }
        })
    }







    exports.getTokenList = function getTokenList() {
        var tokenList = [
            {
                "protocol": "Anchor",
                "symbol": "bLuna",
                "token": "terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp",
                "icon": "https://whitelist.anchor.protocol.com/logo/bLUNA.png"
            },
            {
                "protocol": "Anchor",
                "symbol": "bETH",
                "token": "terra1dzhzukyezv0etz22ud940z7adyv7xgcjkahuun",
                "icon": "https://whitelist.anchor.protocol.com/logo/bETH.png"
            },
            {
                "protocol": "Anchor",
                "symbol": "aUST",
                "token": "terra1hzh9vpxhsk8253se0vv5jj6etdvxu3nv8z07zu",
                "icon": "https://whitelist.anchor.protocol.com/logo/aUST.png"
            },
            {
                "protocol": "Anchor",
                "symbol": "ANC",
                "token": "terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76",
                "icon": "https://whitelist.anchor.protocol.com/logo/ANC.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "MIR",
                "name": "Mirror",
                "token": "terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6",
                "icon": "https://whitelist.mirror.finance/icon/MIR.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mAAPL",
                "name": "Apple Inc.",
                "token": "terra1vxtwu4ehgzz77mnfwrntyrmgl64qjs75mpwqaz",
                "icon": "https://whitelist.mirror.finance/icon/AAPL.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mABNB",
                "name": "Airbnb Inc.",
                "token": "terra1g4x2pzmkc9z3mseewxf758rllg08z3797xly0n",
                "icon": "https://whitelist.mirror.finance/icon/ABNB.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mAMC",
                "name": "AMC Entertainment Holdings Inc.",
                "token": "terra1qelfthdanju7wavc5tq0k5r0rhsyzyyrsn09qy",
                "icon": "https://whitelist.mirror.finance/icon/AMC.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mAMD",
                "name": "Advanced Micro Devices, Inc.",
                "token": "terra18ej5nsuu867fkx4tuy2aglpvqjrkcrjjslap3z",
                "icon": "https://whitelist.mirror.finance/icon/AMD.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mAMZN",
                "name": "Amazon.com, Inc.",
                "token": "terra165nd2qmrtszehcfrntlplzern7zl4ahtlhd5t2",
                "icon": "https://whitelist.mirror.finance/icon/AMZN.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mARKK",
                "name": "ARK Innovation ETF",
                "token": "terra1qqfx5jph0rsmkur2zgzyqnfucra45rtjae5vh6",
                "icon": "https://whitelist.mirror.finance/icon/ARKK.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mBABA",
                "name": "Alibaba Group Holding Limited",
                "token": "terra1w7zgkcyt7y4zpct9dw8mw362ywvdlydnum2awa",
                "icon": "https://whitelist.mirror.finance/icon/BABA.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mBTC",
                "name": "Bitcoin",
                "token": "terra1rhhvx8nzfrx5fufkuft06q5marfkucdqwq5sjw",
                "icon": "https://whitelist.mirror.finance/icon/BTC.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mCOIN",
                "name": "Coinbase Global, Inc.",
                "token": "terra18wayjpyq28gd970qzgjfmsjj7dmgdk039duhph",
                "icon": "https://whitelist.mirror.finance/icon/COIN.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mDOT",
                "name": "Polkadot",
                "token": "terra19ya4jpvjvvtggepvmmj6ftmwly3p7way0tt08r",
                "icon": "https://whitelist.mirror.finance/icon/DOT.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mETH",
                "name": "Ether",
                "token": "terra1dk3g53js3034x4v5c3vavhj2738une880yu6kx",
                "icon": "https://whitelist.mirror.finance/icon/ETH.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mFB",
                "name": "Facebook Inc.",
                "token": "terra1mqsjugsugfprn3cvgxsrr8akkvdxv2pzc74us7",
                "icon": "https://whitelist.mirror.finance/icon/FB.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mGLXY",
                "name": "Galaxy Digital Holdings Ltd",
                "token": "terra1l5lrxtwd98ylfy09fn866au6dp76gu8ywnudls",
                "icon": "https://whitelist.mirror.finance/icon/GLXY.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mGME",
                "name": "GameStop Corp",
                "token": "terra1m6j6j9gw728n82k78s0j9kq8l5p6ne0xcc820p",
                "icon": "https://whitelist.mirror.finance/icon/GME.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mGOOGL",
                "name": "Alphabet Inc.",
                "token": "terra1h8arz2k547uvmpxctuwush3jzc8fun4s96qgwt",
                "icon": "https://whitelist.mirror.finance/icon/GOOGL.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mGS",
                "name": "Goldman Sachs Group Inc.",
                "token": "terra137drsu8gce5thf6jr5mxlfghw36rpljt3zj73v",
                "icon": "https://whitelist.mirror.finance/icon/GS.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mIAU (Delisted)",
                "name": "iShares Gold Trust",
                "token": "terra15hp9pr8y4qsvqvxf3m4xeptlk7l8h60634gqec",
                "icon": "https://whitelist.mirror.finance/icon/IAU.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mIAU",
                "name": "iShares Gold Trust",
                "token": "terra10h7ry7apm55h4ez502dqdv9gr53juu85nkd4aq",
                "icon": "https://whitelist.mirror.finance/icon/IAU.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mMSFT",
                "name": "Microsoft Corporation",
                "token": "terra1227ppwxxj3jxz8cfgq00jgnxqcny7ryenvkwj6",
                "icon": "https://whitelist.mirror.finance/icon/MSFT.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mNFLX",
                "name": "Netflix, Inc.",
                "token": "terra1jsxngqasf2zynj5kyh0tgq9mj3zksa5gk35j4k",
                "icon": "https://whitelist.mirror.finance/icon/NFLX.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mQQQ",
                "name": "Invesco QQQ Trust",
                "token": "terra1csk6tc7pdmpr782w527hwhez6gfv632tyf72cp",
                "icon": "https://whitelist.mirror.finance/icon/QQQ.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mSLV",
                "name": "iShares Silver Trust",
                "token": "terra1kscs6uhrqwy6rx5kuw5lwpuqvm3t6j2d6uf2lp",
                "icon": "https://whitelist.mirror.finance/icon/SLV.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mSPY",
                "name": "SPDR S&P 500",
                "token": "terra1aa00lpfexyycedfg5k2p60l9djcmw0ue5l8fhc",
                "icon": "https://whitelist.mirror.finance/icon/SPY.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mSQ",
                "name": "Square, Inc.",
                "token": "terra1u43zu5amjlsgty5j64445fr9yglhm53m576ugh",
                "icon": "https://whitelist.mirror.finance/icon/SQ.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mTSLA",
                "name": "Tesla, Inc.",
                "token": "terra14y5affaarufk3uscy2vr6pe6w6zqf2wpjzn5sh",
                "icon": "https://whitelist.mirror.finance/icon/TSLA.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mTWTR",
                "name": "Twitter, Inc.",
                "token": "terra1cc3enj9qgchlrj34cnzhwuclc4vl2z3jl7tkqg",
                "icon": "https://whitelist.mirror.finance/icon/TWTR.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mUSO",
                "name": "United States Oil Fund, LP",
                "token": "terra1lvmx8fsagy70tv0fhmfzdw9h6s3sy4prz38ugf",
                "icon": "https://whitelist.mirror.finance/icon/USO.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mVIXY",
                "name": "ProShares VIX Short-Term Futures ETF",
                "token": "terra19cmt6vzvhnnnfsmccaaxzy2uaj06zjktu6yzjx",
                "icon": "https://whitelist.mirror.finance/icon/VIXY.png"
            },
            {
                "protocol": "Mirror",
                "symbol": "mVIXY (Delisted)",
                "name": "ProShares VIX Short-Term Futures ETF",
                "token": "terra1zp3a6q6q4953cz376906g5qfmxnlg77hx3te45",
                "icon": "https://whitelist.mirror.finance/icon/VIXY.png"
            },
            {
                "protocol": "Loterra",
                "symbol": "LOTA",
                "token": "terra1ez46kxtulsdv07538fh5ra5xj8l68mu8eg24vr",
                "icon": "https://loterra.io/LOTA.png"
            },
            {
                "protocol": "Digipharm",
                "symbol": "DPH",
                "name": "Digipharm",
                "token": "terra17jnhankdfl8vyzj6vejt7ag8uz0cjc9crkl2h7",
                "icon": "https://digipharm.io/wp-content/uploads/2021/02/digipharm_etherscan_logo.png"
            },
            {
                "protocol": "Pylon",
                "symbol": "MINE",
                "name": "Pylon MINE token",
                "token": "terra1kcthelkax4j9x8d3ny6sdag0qmxxynl3qtcrpy",
                "icon": "https://assets.pylon.rocks/logo/MINE.png"
            },
            {
                "protocol": "Pylon",
                "symbol": "bPsiDP-24m",
                "name": "Pylon bDP token for Gateway Psi 24m Pool",
                "token": "terra1zsaswh926ey8qa5x4vj93kzzlfnef0pstuca0y",
                "icon": "https://assets.pylon.rocks/logo/bPsiDP.png"
            },
            {
                "protocol": "Spectrum",
                "symbol": "SPEC",
                "name": "Spectrum token",
                "token": "terra1s5eczhe0h0jutf46re52x5z4r03c8hupacxmdr",
                "icon": "https://terra.spec.finance/assets/SPEC.png"
            },
            {
                "protocol": "LOOP",
                "symbol": "LOOP",
                "name": "LOOP token",
                "token": "terra1nef5jf6c7js9x6gkntlehgywvjlpytm7pcgkn4",
                "icon": "https://loop.markets/token/logo2.png"
            },
            {
                "protocol": "LOOP",
                "symbol": "LOOPR",
                "name": "LOOPR token",
                "token": "terra1jx4lmmke2srcvpjeereetc9hgegp4g5j0p9r2q",
                "icon": "https://loop.markets/token/logo3.png"
            },
            {
                "protocol": "Starterra",
                "symbol": "STT",
                "name": "Starterra token",
                "token": "terra13xujxcrc9dqft4p9a8ls0w3j0xnzm6y2uvve8n",
                "icon": "https://starterra.io/assets/100x100_starterra.png"
            },
            {
                "protocol": "terraWorld",
                "symbol": "TWD",
                "name": "TWD token",
                "token": "terra19djkaepjjswucys4npd5ltaxgsntl7jf0xz7w6",
                "icon": "https://terraoffice.world/twd_logo.png"
            },
            {
                "protocol": "Miaw Trader",
                "symbol": "MIAW",
                "name": "MIAW token",
                "token": "terra1vtr50tw0pgqpes34zqu60n554p9x4950wk8f63",
                "icon": "https://www.miaw-trader.com/logo.png"
            },
            {
                "protocol": "Nexus",
                "symbol": "Psi",
                "name": "Nexus Governance token",
                "token": "terra12897djskt9rge8dtmm86w654g7kzckkd698608",
                "icon": "https://terra.nexusprotocol.app/assets/psi.png"
            },
            {
                "protocol": "Valkyrieprotocol",
                "symbol": "VKR",
                "name": "VKR token",
                "token": "terra1dy9kmlm4anr92e42mrkjwzyvfqwz66un00rwr5",
                "icon": "https://app.valkyrie.protocol.com/icon_vkr.png"
            },
            {
                "protocol": "Orion Money",
                "symbol": "ORION",
                "name": "Orion Money token",
                "token": "terra1mddcdx0ujx89f38gu7zspk2r2ffdl5enyz2u03",
                "icon": "https://orion.money/assets/ORION-LOGO-2.1-GREEN@256x256.png",
                "decimals": 8
            },
            {
                "protocol": "terraLand",
                "symbol": "TLAND",
                "name": "terraLand token",
                "token": "terra1r5506ckw5tfr3z52jwlek8vg9sn3yflrqrzfsc",
                "icon": "https://terralandio-site.s3.eu-central-1.amazonaws.com/terraLand-logo-v1c-4x.png",
                "decimals": 6
            },
            {
                "protocol": "White Whale",
                "symbol": "WHALE",
                "name": "Whale token",
                "token": "terra1php5m8a6qd68z02t3zpw4jv2pj4vgw4wz0t8mz",
                "icon": "https://www.whitewhale.money/tokenlogo.png",
                "decimals": 6
            },
            {
                "protocol": "Wormhole",
                "symbol": "weWETH",
                "name": "Wrapped Ether (Wormhole)",
                "token": "terra14tl83xcwqjy0ken9peu4pjjuu755lrry2uy25r",
                "icon": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs/logo.png",
                "decimals": 8
            },
            {
                "protocol": "Wormhole",
                "symbol": "weWBTC",
                "name": "Wrapped BTC (Wormhole)",
                "token": "terra1aa7upykmmqqc63l924l5qfap8mrmx5rfdm0v55",
                "icon": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh/logo.png",
                "decimals": 8
            },
            {
                "protocol": "Wormhole",
                "symbol": "wsSOL",
                "name": "Wrapped SOL (Wormhole)",
                "token": "terra190tqwgqx7s8qrknz6kckct7v607cu068gfujpk",
                "icon": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
                "decimals": 8
            },
            {
                "protocol": "Wormhole",
                "symbol": "weMATIC",
                "name": "Matic token (Wormhole)",
                "token": "terra1dfasranqm4uyaz72r960umxy0w8t6zewqlnkuq",
                "icon": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/C7NNPWuZCNjZBfW5p6JvGsR8pUdsRpEdP1ZAhnoDwj7h/logo.png",
                "decimals": 8
            },
            {
                "protocol": "Wormhole",
                "symbol": "wbWBNB",
                "name": "Wrapped BNB (Wormhole)",
                "token": "terra1cetg5wruw2wsdjp7j46rj44xdel00z006e9yg8",
                "icon": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9gP2kCy3wA1ctvYWQk75guqXuHfrEomqydHLtcTCqiLa/logo.png",
                "decimals": 8
            },
            {
                "protocol": "Wormhole",
                "symbol": "wbCake",
                "name": "PancakeSwap token (Wormhole)",
                "token": "terra1xvqlpjl2dxyel9qrp6qvtrg04xe3jh9cyxc6av",
                "icon": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/J8LKx7pr9Zxh9nMhhT7X3EBmj5RzuhFrHKyJAe2F2i9S/logo.png",
                "decimals": 8
            },
            {
                "protocol": "Wormhole",
                "symbol": "weLINK",
                "name": "ChainLink token (Wormhole)",
                "token": "terra12dfv3f0e6m22z6cnhfn3nxk2en3z3zeqy6ctym",
                "icon": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/2wpTofQ8SkACrkZWrZDjXPitYa8AwWgX8AfxdeBRRVLX/logo.png",
                "decimals": 8
            },
            {
                "protocol": "Wormhole",
                "symbol": "weSUSHI",
                "name": "Sushitoken (Wormhole)",
                "token": "terra1csvuzlf92nyemu6tv25h0l79etpe8hz3h5vn4a",
                "icon": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/ChVzxWRmrTeSgwd3Ui3UumcN8KX7VK3WaD4KGeSKpypj/logo.png",
                "decimals": 8
            },
            {
                "protocol": "Wormhole",
                "symbol": "weUNI",
                "name": "Uniswap (Wormhole)",
                "token": "terra1wyxkuy5jq545fn7xfn3enpvs5zg9f9dghf6gxf",
                "icon": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/8FU95xFJhUUkyyCLU13HSzDLs7oC4QZdXQHL6SCeab36/logo.png",
                "decimals": 8
            },
            {
                "protocol": "Wormhole",
                "symbol": "weUSDT",
                "name": "Tether USD (Wormhole)",
                "token": "terra1ce06wkrdm4vl6t0hvc0g86rsy27pu8yadg3dva",
                "icon": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Dn4noZ5jgGfkntzcQSUZ8czkreiZ1ForXYoV2H8Dm7S1/logo.png",
                "decimals": 6
            },
            {
                "protocol": "Wormhole",
                "symbol": "weUSDC",
                "name": "USD Coin (Wormhole)",
                "token": "terra1pepwcav40nvj3kh60qqgrk8k07ydmc00xyat06",
                "icon": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/A9mUU4qviSctJVPJdBJWkb28deg915LYJKrzQ19ji3FM/logo.png",
                "decimals": 6
            },
            {
                "protocol": "Kujira",
                "symbol": "KUJI",
                "name": "Kujira token",
                "token": "terra1xfsdgcemqwxp4hhnyk4rle6wr22sseq7j07dnn",
                "icon": "https://assets.kujira.app/kuji.png",
                "decimals": 6
            },
            {
                "protocol": "Wormhole",
                "symbol": "wewstETH",
                "name": "Wrapped liquid staked Ether 2.0 (Wormhole)",
                "token": "terra133chr09wu8sakfte5v7vd8qzq9vghtkv4tn0ur",
                "icon": "https://static.lido.fi/wstETH/wstETH.png"
            },
            {
                "protocol": "Wormhole",
                "symbol": "wsstSOL",
                "name": "Lido staked SOL (Wormhole)",
                "token": "terra1t9ul45l7m6jw6sxgvnp8e5hj8xzkjsg82g84ap",
                "icon": "https://static.lido.fi/stSOL/stSOL.png",
                "decimals": 8
            },
            {
                "protocol": "Wormhole",
                "symbol": "whLDO",
                "name": "Lido DAO token (Wormhole)",
                "token": "terra1jxypgnfa07j6w92wazzyskhreq2ey2a5crgt6z",
                "icon": "https://static.lido.fi/LDO/LDO.png",
                "decimals": 8
            },
            {
                "protocol": "Lido",
                "symbol": "stLuna",
                "name": "Lido staked Luna",
                "token": "terra1yg3j2s986nyp5z7r2lvt0hx3r0lnd7kwvwwtsc",
                "icon": "https://static.lido.fi/stLUNA/stLUNA.png",
                "decimals": 6
            },
            {
                "protocol": "Wormhole",
                "symbol": "XDEFI",
                "name": "XDEFI (Wormhole)",
                "token": "terra169edevav3pdrtjcx35j6pvzuv54aevewar4nlh",
                "icon": "https://github.com/sushiswap/assets/blob/master/blockchains/ethereum/assets/0x72B886d09C117654aB7dA13A14d603001dE0B777/logo.png?raw=true",
                "decimals": 8
            },
            {
                "protocol": "Mars",
                "symbol": "MARS",
                "name": "Mars",
                "token": "terra1a7zxk56c72elupp7p44hn4k94fsvavnhylhr6h",
                "icon": "https://marsprotocol.io/mars_logo_colored.svg",
                "decimals": 6
            },
            {
                "protocol": "Bitlocus",
                "symbol": "BTL",
                "name": "Bitlocus token",
                "token": "terra193c42lfwmlkasvcw22l9qqzc5q2dx208tkd7wl",
                "icon": "https://bitlocus.com/assets/btl-token.png",
                "decimals": 6
            },
            {
                "protocol": "Stader",
                "symbol": "LunaX",
                "name": "LunaX token",
                "token": "terra17y9qkl8dfkeg4py7n0g5407emqnemc3yqk5rup",
                "icon": "https://raw.githubusercontent.com/stader-labs/assets/main/terra/LunaX_1.png",
                "decimals": 6
            },
            {
                "protocol": "LUNI",
                "symbol": "LUNI",
                "name": "LUNI",
                "token": "terra1m3tdguf59xq3pa2twk5fjte5g6szj5y9x5npy7",
                "icon": "https://d2s3n99uw51hng.cloudfront.net/static/100_100_LUNI_logo.png",
                "decimals": 6
            },
            {
                "protocol": "PlayNity",
                "symbol": "PLY",
                "name": "PlayNity token",
                "token": "terra13awdgcx40tz5uygkgm79dytez3x87rpg4uhnvu",
                "icon": "https://playnity.io/uploads/logo/logo100.png",
                "decimals": 6
            },
            {
                "protocol": "terraFloki",
                "symbol": "TFLOKI",
                "name": "TFLOKI",
                "token": "terra1u2k0nkenw0p25ljsr4ksh7rxm65y466vkdewwj",
                "icon": "https://terrafloki.io/terrafloki_logo.png",
                "decimals": 6
            },
            {
                "protocol": "terraFloki",
                "symbol": "TFTIC",
                "name": "TFLOKI Genesis Ticket",
                "token": "terra1a8k3jyv3wf6k3zngza5h6srrxcckdf7zv90p6u",
                "icon": "https://terrafloki.io/ticket_logo.png",
                "decimals": 6
            },
            {
                "protocol": "terraFloki",
                "symbol": "TFTICII",
                "name": "TFLOKI New World Ticket",
                "token": "terra1xt9fgu7965kgvunnjts9zkprd8986kcc444q86",
                "icon": "https://terrafloki.io/ticket2_logo.png",
                "decimals": 6
            },
            {
                "protocol": "terraFloki",
                "symbol": "TFTICIII",
                "name": "TFLOKI Aviator Ticket",
                "token": "terra1vte2xv7dr8sfnrnwdf9arcyprqgr0hty5ads28",
                "icon": "https://terrafloki.io/ticket3_logo.png",
                "decimals": 6
            },
            {
                "protocol": "Moon",
                "symbol": "MOON",
                "name": "Moon token",
                "token": "terra1hmxxq0y8h79f3228vs0czc4uz5jdgjt0appp26",
                "icon": "https://www.terra-moon.com/logo.png"
            },
            {
                "protocol": "Astroport",
                "symbol": "ASTRO",
                "name": "Astroport token",
                "token": "terra1xj49zyqrwpv5k928jwfpfy2ha668nwdgkwlrg3",
                "icon": "https://astroport.fi/astro_logo.png"
            },
            {
                "protocol": "Angel protocol",
                "symbol": "HALO",
                "name": "Angel protocol token",
                "token": "terra1w8kvd6cqpsthupsk4l0clwnmek4l3zr7c84kwq",
                "icon": "https://angelprotocol.io/favicon.png",
                "decimals": 6
            },
            {
                "protocol": "AstroPug",
                "symbol": "PUG",
                "name": "AstroPug token",
                "token": "terra1kdfsdm3c4reun9j3m4mk3nmyw4a4ns7mj24q3j",
                "icon": "https://raw.githubusercontent.com/astropug/astropug-world/master/logo.png",
                "decimals": 6
            },
            {
                "protocol": "Orne",
                "symbol": "ORNE",
                "name": "Orne token",
                "token": "terra1hnezwjqlhzawcrfysczcxs6xqxu2jawn729kkf",
                "icon": "https://orne.io/img/token_icon.png",
                "decimals": 6
            },
            {
                "protocol": "terra Name Service",
                "symbol": "TNS",
                "name": "terra Name Service",
                "token": "terra14vz4v8adanzph278xyeggll4tfww7teh0xtw2y",
                "icon": "https://tns.money/static/images/tns.png",
                "decimals": 6
            }
        ]

        return tokenList;

    }

    exports.getAnchorBalance = async function getAnchorBalance(walletAddress) {
        let ep = `https://api.apeboard.finance/anchorTerra/${walletAddress}`

        try {
            let response = await fetch(
                ep,
                {
                    method: 'GET',
                    timeout: 30000,
                    mode: "cors",
                    agent: "",
                    headers: {
                        passcode: '5a102a34f60fa7ec9d643a8a0e72cab9',
                        'ape-secret': 'U2FsdGVkX1/mMwcXP1tVTeVxm+AkSfrzpWbovzKmyHcc4c8/N7iy6/JmRqtuMj3BPp0/A3ihRa8dddyZWTBG/9j6unKTmv1Wcqnr9v8IrPPe2TaqXbuh+tRH80UwfFzqmzcXKEqy1k59Fg0ooy6wvg=='
                    }
                }
            );

            let data = await response.json()
            exports.createLs("anchor")
            exports.addToLs("anchor", data)

        } catch (e) {
            console.log(e);
            return false;
        }

        // fetch(ep)
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not OK')
        //         }
        //         return response.json();
        //     })
        //     .then(data => {
        //         exports.createLs(coinName)
        //         exports.addToLs(`deposits`, data);
        //         // exports.addToLs(`borrows`, data.borrows);
        //     })
        //     .catch(error => {
        //         console.error('There has been a problem with your fetch operation:', error);
        //     });
    }

    // Your code goes here
    exports.addToLs = function addToLs(name, obj){
        var array = JSON.parse(localStorage.getItem(name))
        array.push(obj);
        localStorage.setItem(name, JSON.stringify(array))
    }

    exports.createLs = function createLs(name) {
        let array = [];
        localStorage.setItem(`${name}`, JSON.stringify(array))
    }

    exports.getWalletContractBalance = async function getWalletContractBalance(walletAddress, contractAddress) {

        let b64 = btoa(unescape(encodeURIComponent(`{"balance":{"address":"${walletAddress}"}}`)))
        let url = `https://lcd.terra.dev/terra/wasm/v1beta1/contracts/${contractAddress}/store?query_msg=${b64}`
        let contractName = 'starTerra'

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not OK')
                }
                return response.json();
            })
            .then(data => {
                exports.createLs(contractName)
                exports.addToLs(contractName, data.query_result.balance);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }

    // function addToPage(obj) {
    //     // Create button
    //     var newButton = `<button id="${obj.id}" type="button" class="btn btn-sm btn-secondary m-1"  onclick="makePrimary(this.id)"></a>${obj.value}</button>`;
    //     document.getElementById('outOb').insertAdjacentHTML('beforeend', newButton);
    //     makePrimary(obj.id);
    //     document.getElementById('inOb').value = '';
    // }

    exports.getWalletContractBalance("terra1nps9aq9h645fqylr0lsu0cz0uj0j3mudch5j64", "terra13xujxcrc9dqft4p9a8ls0w3j0xnzm6y2uvve8n")


})(typeof exports === 'undefined' ? this['mymodule'] = {} : exports);
