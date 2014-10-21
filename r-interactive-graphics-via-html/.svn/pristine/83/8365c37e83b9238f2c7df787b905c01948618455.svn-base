context("Test lines_RIGHT.R")

## ---
## Test lines_RIGHT():
## ---

setRIGHT(libDir_RIGHT = ".",
         nameArray = "dummy",
         numAxis = 0,
         numLines = 0,
         sourceArray = c(),
         scriptArray = c())

test_that("There should be an axis to use lines_RIGHT()", {

  expect_error(lines_RIGHT(conc ~ Time, Theoph)) 
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numLines, 0)
  expect_identical(temp$nameArray, "dummy")
  expect_false(any("line.js" %in% temp$sourceArray))
  
}) # test_that

setRIGHT(numAxis = 1,
         numServer = 0)

test_that("data.frame object should exist", {
  
  expect_error(lines_RIGHT(conc ~ Time, dummy))
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numLines, 0)
  expect_identical(temp$nameArray, "dummy")
  expect_false(any("line.js" %in% temp$sourceArray))
  
}) # test_that

test_that("Column names should exist", {
  
  expect_error(lines_RIGHT(conc1 ~ Time, Theoph))
  expect_error(lines_RIGHT(conc ~ Time1, Theoph))
  expect_error(lines_RIGHT(conc ~ Time, Theoph, by = Subject1))
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numLines, 0)
  expect_identical(temp$nameArray, "dummy")
  expect_false(any("line.js" %in% temp$sourceArray))
  
}) # test_that

test_that("Check script generation without any options", {
  
  lines_RIGHT(conc ~ Time, Theoph)
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numLines, 1)
  expect_identical(temp$nameArray, c("dummy", "Theoph"))
  expect_identical(temp$scriptArray, 
                   c("var lineObj1 = new MakeLineObj(Theoph, 'Time', 'conc', {});",
                     "var line1 = new Line(axis1, lineObj1, 'x1', 'x2', 'y1', 'y2', {});"))
  expect_true(any("line.js" %in% temp$sourceArray))
  
  lines_RIGHT(conc ~ Time, "Theoph")
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numLines, 2)
  expect_identical(temp$nameArray, c("dummy", "Theoph", "Theoph"))
  expect_identical(temp$scriptArray, c("var lineObj1 = new MakeLineObj(Theoph, 'Time', 'conc', {});",
                                       "var line1 = new Line(axis1, lineObj1, 'x1', 'x2', 'y1', 'y2', {});",
                                       "var lineObj2 = new MakeLineObj(Theoph, 'Time', 'conc', {});",
                                       "var line2 = new Line(axis1, lineObj2, 'x1', 'x2', 'y1', 'y2', {});"))
  expect_true(any("line.js" %in% temp$sourceArray))

}) # test_that

setRIGHT(numLines = 0,
         numServer = 0,
         nameArray = c(),
         sourceArray = c(),
         scriptArray = c())

test_that("Check by option", {
  
  lines_RIGHT(conc ~ Time, Theoph, by = "Subject")
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numLines, 1)
  expect_identical(temp$nameArray, c("Theoph"))
  expect_identical(temp$scriptArray, 
                   c("var lineObj1 = new MakeLineObj(Theoph, 'Time', 'conc', {group: 'Subject'});",
                     "var line1 = new Line(axis1, lineObj1, 'x1', 'x2', 'y1', 'y2', {});"))
  expect_true(any("line.js" %in% temp$sourceArray))
  
}) # test_that

# setRIGHT(numAxis = 1,
#          numLines = 0,
#          scriptArray = c())
# 
# test_that("Check col option:", {
#   
#   lines_RIGHT(conc ~ Time, Theoph, col = "red")
#   temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
#   expect_identical(temp$numLines, 1)
#   expect_identical(temp$scriptArray, c("var lineObj1 = new MakeLineObj(Theoph, 'Time', 'conc');",
#                                        "var line1 = new Line(axis1, lineObj1, 'x1', 'x2', 'y1', 'y2', {baseColor: [255, 0, 0]});"))
#   
#   lines_RIGHT(conc ~ Time, Theoph, col = c(1.0, 2.0, 3.0))
#   temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
#   expect_identical(temp$numLines, 2)
#   expect_identical(temp$scriptArray, c("var lineObj1 = new MakeLineObj(Theoph, 'Time', 'conc');",
#                                        "var line1 = new Line(axis1, lineObj1, 'x1', 'x2', 'y1', 'y2', {baseColor: [255, 0, 0]});",
#                                        "var lineObj2 = new MakeLineObj(Theoph, 'Time', 'conc');",
#                                        "var line2 = new Line(axis1, lineObj2, 'x1', 'x2', 'y1', 'y2', {baseColor: [1, 2, 3]});"))
#                                     
# }) # test_that

setRIGHT(numLines = 0,
         nameArray = c(),
         sourceArray = c(),
         scriptArray = c())

test_that("Check isString option:", {

  lines_RIGHT(conc ~ Time, "Theoph", by = "Subject", isString = TRUE)
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numLines, 1)
  expect_identical(temp$nameArray, c("Theoph"))
  expect_identical(temp$scriptArray, 
                   c("var lineObj1 = new MakeLineObj(Theoph, 'Time', 'conc', {group: 'Subject'});",
                     "var line1 = new Line(axis1, lineObj1, 'x1', 'x2', 'y1', 'y2', {});"))
  expect_true(any("line.js" %in% temp$sourceArray))

}) # test_that
