const model = require("../model/sp.model");
const loai = require("../model/loai.model");


exports.all = async (req, res, next) => {
  console.log(req.params.loai_sp)
    const page = +req.query.page || 1;
    const limit = +req.query.page_size || 12;
    const count = await model.countByCategory(req.params.loai_sp);
    const len = Math.ceil((count[0].sl)/limit);
    console.log(len);
  
    const pageList = [];
    for (let i = page - 1; i <= Math.min(page + 1, len) ; i++) {
      if (i > 0) pageList.push({ page: i, active: i === page });
    }
  
    const dssp = await model.allByCategory(req.params.loai_sp, page-1, limit);

    const dsl = await loai.all();
    res.render("dssp", { dssp, page, pageList, len , dsl});
  };