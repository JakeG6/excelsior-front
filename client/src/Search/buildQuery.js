const buildQuery = (state) => {

    let searchQuery = '/api/chars/search?';
    let queryStrArr = [];

    if (state.name) {
    queryStrArr.push(`name=${state.name}`);
    }

    if (state.alignment) {
    queryStrArr.push(`alignment=${state.alignment}`);
    }

    if (state.team) {
    queryStrArr.push(`teams=["${state.team}"]`);
    }

    if (state.ability) {
    queryStrArr.push(`ability=${state.ability}`);
    }

    if (state.company) {
        queryStrArr.push(`company=${state.company}`);
    }

    for (let i = 0; i < queryStrArr.length; i++) {
        searchQuery += queryStrArr[i];
        if  (i < queryStrArr.length -1) {
            searchQuery += '&';
        }
    }
    //console.log(searchQuery);

    return searchQuery;
}

export default buildQuery;