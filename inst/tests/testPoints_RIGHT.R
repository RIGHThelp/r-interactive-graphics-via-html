context("Test points_RIGHT.R")

## ---
## Test points_RIGHT():
## ---

setRIGHT(libDir_RIGHT = ".",
         nameArray = "dummy",
         numAxis = 0,
         numPoints = 0,
         sourceArray = c(),
         scriptArray = c())

# CHECK (junghoon): is there a way to check the error message?

test_that("There should be an axis to use points_RIGHT()", {
  
  expect_error(points_RIGHT(conc ~ Time, Theoph)) 
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numPoints, 0)
  expect_identical(temp$nameArray, "dummy")
  expect_false(any("dot.js" %in% temp$sourceArray))
  
}) # test_that

setRIGHT(numAxis = 1)

test_that("data.frame object should exist", {
  
  expect_error(points_RIGHT(conc ~ Time, dummy))
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numPoints, 0)
  expect_identical(temp$nameArray, "dummy")
  expect_false(any("dot.js" %in% temp$sourceArray))
  
}) # test_that

test_that("Column names should exist", {
  
  expect_error(points_RIGHT(conc1 ~ Time, Theoph))
  expect_error(points_RIGHT(conc ~ Time1, Theoph))
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numPoints, 0)
  expect_identical(temp$nameArray, "dummy")
  expect_false(any("dot.js" %in% temp$sourceArray))
  
}) # test_that

test_that("Check script generation without any options", {
  
  points_RIGHT(conc ~ Time, Theoph)
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numPoints, 1)
  expect_identical(temp$nameArray, c("dummy", "Theoph"))
  expect_identical(temp$scriptArray, "var point1 = new Dot(axis1, Theoph, 'Time', 'conc', {});")
  expect_true(any("dot.js" %in% temp$sourceArray))
  
  points_RIGHT(conc ~ Time, "Theoph")
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numPoints, 2)
  expect_identical(temp$nameArray, c("dummy", "Theoph", "Theoph"))
  expect_identical(temp$scriptArray, c("var point1 = new Dot(axis1, Theoph, 'Time', 'conc', {});",
                                       "var point2 = new Dot(axis1, Theoph, 'Time', 'conc', {});"))
  expect_true(any("dot.js" %in% temp$sourceArray))
  
}) # test_that

# setRIGHT(numAxis = 1,
#          numPoints = 0,
#          scriptArray = c())
# 
# test_that("Check col option:", {
# 
#   points_RIGHT(conc ~ Time, Theoph, col = "red")
#   temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
#   expect_identical(temp$numPoints, 1)
#   expect_identical(temp$scriptArray, "var point1 = new Dot(axis1, Theoph, 'Time', 'conc', {baseColor: [255, 0, 0]});")
# 
#   points_RIGHT(conc ~ Time, Theoph, col = c(1.0, 2.0, 3.0))
#   temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
#   expect_identical(temp$numPoints, 2)
#   expect_identical(temp$scriptArray, c("var point1 = new Dot(axis1, Theoph, 'Time', 'conc', {baseColor: [255, 0, 0]});",
#                                        "var point2 = new Dot(axis1, Theoph, 'Time', 'conc', {baseColor: [1, 2, 3]});"))
#   
# }) # test_that

setRIGHT(numPoints = 0,
         nameArray = c(),
         sourceArray = c(),
         scriptArray = c())

test_that("Check isString option:", {

  points_RIGHT(conc ~ Time, "Theoph", isString = TRUE)
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numPoints, 1)
  expect_identical(temp$nameArray, c("Theoph"))
  expect_identical(temp$scriptArray, "var point1 = new Dot(axis1, Theoph, 'Time', 'conc', {});")
  expect_true(any("dot.js" %in% temp$sourceArray))

}) # test_that
