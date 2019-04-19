module.exports = app =>{
    app.get('/dashboard/new', (req, res) =>{
        res.send('hey');
    });
}