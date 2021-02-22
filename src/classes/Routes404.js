class Routes404 {
  invalidRoute404(req, res, next) {
    res.status(404).send({ message: "Invalid route!" });
  }
}

module.exports = new Routes404();
