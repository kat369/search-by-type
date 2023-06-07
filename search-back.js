app.get("/search", async (req, res) => {
  try {
    const { key, type } = req.query;
    console.log(key)
        console.log(type)
    
    if(key !== ""){
     if(type === "all"){
       const data = await articles.find({
          $or: [
            { name: { $regex: key, $options: "i" } },
            { author: { $regex: key, $options: "i" } },
            { keywords: { $regex: key, $options: "i" } },
            { abstract: { $regex: key, $options: "i" } },
            { referance: { $regex: key, $options: "i" } },
          ],
        });
    res.json({ data });

     }else if(type === "keywords"){

       const data = await articles.find({
          $or: [
            
             { keywords: { $regex: key, $options: "i" } },
           
          ],
        });
    res.json({ data });
     }else if(type === "abstract"){

       const data = await articles.find({
          $or: [
            
            { abstract: { $regex: key, $options: "i" } },
            
          ],
        });
    res.json({ data });
     }else if(type === "authors"){

       const data = await articles.find({
          $or: [
            
           { author: { $regex: key, $options: "i" } },
            
          ],
        });
    res.json({ data });
     }else if(type === "article"){

       const data = await articles.find({
          $or: [
            
           { articles: { $regex: key, $options: "i" } },
            
          ],
        });
    res.json({ data });
     }
     
    }else{
      res.json({ message : "Enter a key word to search"});
    }
    
  } catch (error) {
    console.log(error);
  }
});
