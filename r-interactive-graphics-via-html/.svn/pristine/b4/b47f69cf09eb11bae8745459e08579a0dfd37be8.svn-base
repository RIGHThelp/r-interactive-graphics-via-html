context("Test hist_RIGHT.R")

setRIGHT(libDir_RIGHT = ".", 
         nameArray = c("dummy"),
         divArray = c(),
         scriptArray = c(),
         numAxis = 0,
         numHist = 0)

test_that("data.frame object should exist", {
  
  expect_error(hist_RIGHT(Subject, dummy))
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numAxis, 0)
  expect_identical(temp$numHist, 0)
  expect_identical(temp$nameArray, "dummy")
  expect_false(any(file.path(temp$libDir_RIGHT, "bar.js") %in% temp$sourceArray))
  
}) # test_that

test_that("Column name should exist", {
  
  expect_error(hist_RIGHT(Subject1, Theoph))
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numAxis, 0)
  expect_identical(temp$numHist, 0)
  expect_identical(temp$nameArray, "dummy")
  expect_false(any(file.path(temp$libDir_RIGHT, "bar.js") %in% temp$sourceArray))
  
}) # test_that

test_that("Check script generation without any options", {
  
  hist_RIGHT(Subject, Theoph)
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numAxis, 1)
  expect_identical(temp$numHist, 1)
  expect_identical(temp$nameArray, c("dummy", "Theoph"))
  expect_identical(temp$divArray, '<div id="container1" oncontextmenu="return false;"></div>')
  expect_identical(temp$scriptArray, 
                   c("var histObj1 = new ddply(Theoph, ['Subject'], {});",
                     "var axis1 = new Axis(1, histObj1, 'Subject', 'frequency', {});",
                     "var hist1 = new Bar(axis1, histObj1, 'Subject', 'frequency', {});"))
  expect_true(any("bar.js" %in% temp$sourceArray))
  
}) # test_that

setRIGHT(divArray = c(),
         scriptArray = c(),
         numAxis = 0,
         numHist = 0)

test_that("Check color option:", {
  
  hist_RIGHT(Subject, Theoph, color = Subject)
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$divArray, '<div id="container1" oncontextmenu="return false;"></div>')
  expect_identical(temp$scriptArray, 
                   c("var histObj1 = new ddply(Theoph, ['Subject'], {});",
                     "var axis1 = new Axis(1, histObj1, 'Subject', 'frequency', {legend: 'Subject'});",
                     "var hist1 = new Bar(axis1, histObj1, 'Subject', 'frequency', {});"))

  hist_RIGHT(Time, Theoph, color = Subject)
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$divArray, c('<div id="container1" oncontextmenu="return false;"></div>',
                                    '<div id="container2" oncontextmenu="return false;"></div>'))
  expect_identical(temp$scriptArray, 
                   c("var histObj1 = new ddply(Theoph, ['Subject'], {});",
                     "var axis1 = new Axis(1, histObj1, 'Subject', 'frequency', {legend: 'Subject'});",
                     "var hist1 = new Bar(axis1, histObj1, 'Subject', 'frequency', {});",
                     "var histObj2 = new ddply(Theoph, ['Time', 'Subject'], {});",
                     "var axis2 = new Axis(2, histObj2, 'Time', 'frequency', {legend: 'Subject'});",
                     "var hist2 = new Bar(axis2, histObj2, 'Time', 'frequency', {});"))
  
}) # test_that

setRIGHT(divArray = c(),
         scriptArray = c(),
         numAxis = 0,
         numHist = 0)

test_that("Check isString option:", {
  
  hist_RIGHT("Subject", "Theoph", color = "Subject", isString = TRUE)
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$divArray, '<div id="container1" oncontextmenu="return false;"></div>')
  expect_identical(temp$scriptArray, 
                   c("var histObj1 = new ddply(Theoph, ['Subject'], {});",
                     "var axis1 = new Axis(1, histObj1, 'Subject', 'frequency', {legend: 'Subject'});",
                     "var hist1 = new Bar(axis1, histObj1, 'Subject', 'frequency', {});"))

}) # test_that
