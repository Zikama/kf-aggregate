exports.homeViewRenderer = (req,res)=>{
    return res.render('home', {
        title: `Home`,
    })
}