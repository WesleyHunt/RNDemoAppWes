function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
}

//check concurrency is something usable
const arrayResolver = async (valueArray, asyncCallBack, concurrency) => {
    if (concurrency <= 0) {
        return "error"
    }

    var maxConcurrency = (valueArray.length >= concurrency) ? concurrency : valueArray.length
    var arrayArg = valueArray
    var arrayOperationsComplete = 0
    var launchedOpArray = []

    //Launch a loop for each possible concurrency
    for (i = 0; i < maxConcurrency; i++) {
        var arg = launchLoopOp()
        launchedOpArray.push(arg)
    }
    await Promise.all(launchedOpArray) //wait for threads to return they can not operate i.e. "success"

    /**
     * performs async call back within loop; each loops accesses a shared arrayOperationsComplete variable to determine which
     * portion of the array to access for callback and subsequently modify. When no more operations can be performed, "success"
     * is returned.
     **/
    async function launchLoopOp() {
        while (arrayOperationsComplete < arrayArg.length) {
            var op = arrayOperationsComplete
            arrayOperationsComplete++
            arrayArg[op] = await asyncCallBack(arrayArg[op])
        }
        return "success"
    }

    return arrayArg //returns modified array
}

async function callBack(value) {
    await timer(8000 * Math.random()) //timer to simulate variable amount of time per operation
    const mathd = value + 1
    return mathd
}

//call function
async function main() {
    const newArray = await arrayResolver([2, 3, 4], callBack, 2)
    console.log(newArray)
}

main()