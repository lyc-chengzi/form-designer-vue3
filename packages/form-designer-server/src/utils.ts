const delayGenerator = (delayMiSeconds: number, callback: Function) => {
    // eslint-disable-next-line func-names
    let delay: any;
    return function () {
        clearTimeout(delay);
        delay = setTimeout(() => {
            callback();
        }, delayMiSeconds);
    };
};

const convertCvsToTable = (data: any) => {
    data = data.toString();
    const table = [];
    let rows = [];
    rows = data.split('\r\n');
    for (let i = 0; i < rows.length; i++) {
        table.push(rows[i].split(','));
    }
    return table;
};

export { delayGenerator, convertCvsToTable };
