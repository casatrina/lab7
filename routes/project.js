var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  // query for the specific project and
  // call the following callback

  projects = models.Project.find({"_id": projectID});
  projects.exec(afterQuery);

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
  var newProject = new models.Project({
    "title": form_data["project_title"],
    "date": form_data["date"],
    "summary": form_data["summary"],
    "image": form_data["image_url"]
  });
  console.log(newProject);
  newProject.save(toSave);

  function toSave(err) {
    if(err) {console.log(err); res.send(500); }
    res.redirect('/');
  }


}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();

  projects = models.Project.find({"_id": projectID});
  projects.remove();
  projects.exec(toDelete);

  function toDelete(err, projects) {
    if(err) console.log(err);
    res.send();
  }
}