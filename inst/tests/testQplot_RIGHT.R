context("Test qplot_RIGHT.R")

## ---
## Test qplot_RIGHT():
## ---

setRIGHT(nameArray = c(),
         divArray = c(),
         scriptArray = c(),
         numAxis = 0,
         numPoints = 0,
         numLines = 0,
         numHist = 0,
         numBox = 0)

test_that("Check script generation without any options", {
  
  obj <- createQlot(x=conc, y=Time, data=Theoph, geom="point")
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numAxis, 1)
  expect_identical(temp$numPoints, 1)
  expect_identical(temp$numLines, 0)
  expect_identical(temp$nameArray, "Theoph")
  expect_identical(temp$divArray, '<div id="container1" oncontextmenu="return false;"></div>')
  expect_identical(temp$scriptArray, c("var axis1 = new Axis(1, Theoph, 'conc', 'Time', {});",
                                       "var point1 = new Dot(axis1, Theoph, 'conc', 'Time', {});"))
  
  obj <- createQlot(x=conc, data=Theoph, geom="bar")
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numAxis, 2)
  expect_identical(temp$numHist, 1)
  expect_identical(temp$nameArray, c("Theoph", "Theoph"))
  expect_identical(temp$divArray, c('<div id="container1" oncontextmenu="return false;"></div>', 
                                    '<div id="container2" oncontextmenu="return false;"></div>'))
  expect_identical(temp$scriptArray, c("var axis1 = new Axis(1, Theoph, 'conc', 'Time', {});",
                                       "var point1 = new Dot(axis1, Theoph, 'conc', 'Time', {});",
                                       "var histObj1 = new ddply(Theoph, ['conc'], {});",                  
                                       "var axis2 = new Axis(2, histObj1, 'conc', 'frequency', {});",
                                       "var hist1 = new Bar(axis2, histObj1, 'conc', 'frequency', {});"))
  
  setRIGHT(nameArray = c(),
           divArray = c(),
           scriptArray = c(),
           numAxis = 0,
           numPoints = 0,
           numLines = 0,
           numHist = 0,
           numBox = 0)
  
  obj <- createQlot(x=conc, y=Wt, data=Theoph, geom="line")
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numAxis, 1)
  expect_identical(temp$numLines, 1)
  expect_identical(temp$nameArray, "Theoph")
  expect_identical(temp$divArray, '<div id="container1" oncontextmenu="return false;"></div>')
  expect_identical(temp$scriptArray, c("var axis1 = new Axis(1, Theoph, 'conc', 'Wt', {});",                
                                       "var lineObj1 = new MakeLineObj(Theoph, 'conc', 'Wt', {});",         
                                       "var line1 = new Line(axis1, lineObj1, 'x1', 'x2', 'y1', 'y2', {});"))
  
  obj <- createQlot(x=Subject, y=Wt, data=Theoph, geom="boxplot")
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numAxis, 2)
  expect_identical(temp$numPoints, 0)
  expect_identical(temp$numBox, 1)
  expect_identical(temp$nameArray, c("Theoph", "Theoph"))
  expect_identical(temp$scriptArray, c("var axis1 = new Axis(1, Theoph, 'conc', 'Wt', {});",
                                       "var lineObj1 = new MakeLineObj(Theoph, 'conc', 'Wt', {});",
                                       "var line1 = new Line(axis1, lineObj1, 'x1', 'x2', 'y1', 'y2', {});",
                                       "var boxObj1 = new MakeBoxObj(Theoph, ['Subject'], ['Wt'], {});",
                                       "var axis2 = new Axis(2, boxObj1, 'Subject', 'Wt', {});",   
                                       "var box1 = new Box(axis2, boxObj1, {});"))
}) # test_that

setRIGHT(nameArray = c(),
         divArray = c(),
         scriptArray = c(),
         numAxis = 0,
         numPoints = 0,
         numLines = 0,
         numHist = 0)

test_that("Check color option:", {
  
  obj <- createQlot(x=conc, y=Time, data=Theoph, colour=Subject, geom="point")
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numAxis, 1)
  expect_identical(temp$numPoints, 1)
  expect_identical(temp$numLines, 0)
  expect_identical(temp$nameArray, "Theoph")
  expect_identical(temp$divArray, '<div id="container1" oncontextmenu="return false;"></div>')
  expect_identical(temp$scriptArray, c("var axis1 = new Axis(1, Theoph, 'conc', 'Time', {legend: 'Subject'});",
                                       "var point1 = new Dot(axis1, Theoph, 'conc', 'Time', {});"))
  
  obj <- createQlot(x=conc, fill=Time, data=Theoph, geom="bar")
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numAxis, 2)
  expect_identical(temp$numHist, 1)
  expect_identical(temp$nameArray, c("Theoph", "Theoph"))
  expect_identical(temp$divArray, c('<div id="container1" oncontextmenu="return false;"></div>', 
                                    '<div id="container2" oncontextmenu="return false;"></div>'))
  expect_identical(temp$scriptArray, c("var axis1 = new Axis(1, Theoph, 'conc', 'Time', {legend: 'Subject'});",
                                       "var point1 = new Dot(axis1, Theoph, 'conc', 'Time', {});",
                                       "var histObj1 = new ddply(Theoph, ['conc', 'Time'], {});",                  
                                       "var axis2 = new Axis(2, histObj1, 'conc', 'frequency', {legend: 'Time'});",
                                       "var hist1 = new Bar(axis2, histObj1, 'conc', 'frequency', {});"))
}) # test_that