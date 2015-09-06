var exec = require('child_process').exec;

queue([stash, checkout, getBack, commit, stashPop]);

function queue (fns) {
    // Execute and remove the first function.
    fns.shift()(function (err) {
        if (!err) {
            if (fns.length) {
                // If we still have functions
                // we continue
                queue(fns);
            } else {
                // We exist if we've finished
                process.exit(0);
            }
        } else {
            // We log if we have an error.
            console.error(err);
            process.exit(1);
        }
    });
}

function stash (next) {
    exec('git stash', next);
}

function stashPop (next) {
    exec('git stash pop', next);
}

function checkout (next) {
    exec('git checkout gh-pages', next);
}

function getBack (next) {
    exec('git checkout master ./dist/nipplejs.js ./javascripts/nipplejs.js',
        next);
}

function commit (next) {
    exec('git add ./javascript/nipplejs.js && ' +
        'git commit -m "chore: new build" && ' +
        'git push origin gh-pages', next);
}
