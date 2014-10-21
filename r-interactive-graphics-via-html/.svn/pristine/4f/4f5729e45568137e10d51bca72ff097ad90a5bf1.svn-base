context("Test ggplot_RIGHT.R")

## ---
## Test ggplot_RIGHT():
## ---

test_that("Check returned object from ggplot_RIGHT()", {
  
  expect_error(ggplot_RIGHT(dummy)) 
  
  obj <- createGgplot(Theoph, ggplot2::aes(conc, Time))
  
  expect_identical(obj$labels$x, "conc")
  expect_identical(obj$labels$y, "Time")
  
}) # test_that

setRIGHT(nameArray = c(),
         divArray = c(),
         scriptArray = c(),
         axis.x = c(),
         axis.y = c(),
         axis.fill = c(),
         axis.color = c(),
         axis.by = c(),
         axis.data = c(),
         numAxis = 0,
         numPoints = 0,
         numLines = 0,
         numHist = 0,
         numBox = 0,
         plot_line = 0)

test_that("Check script generation without any options", {
  
  obj <- createGgplot(Theoph, ggplot2::aes(conc, Time)) + geom_point()
  ggplot_RIGHT(obj)
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numAxis, 1)
  expect_identical(temp$numPoints, 1)
  expect_identical(temp$numLines, 0)
  expect_identical(temp$nameArray, "Theoph")
  expect_identical(temp$divArray, '<div id="container1" oncontextmenu="return false;"></div>')
  expect_identical(temp$scriptArray, c("var axis1 = new Axis(1, Theoph, 'conc', 'Time', {});",
                                       "var point1 = new Dot(axis1, Theoph, 'conc', 'Time', {});"))
  
  obj <- createGgplot(Theoph, ggplot2::aes(conc)) + geom_bar()
  ggplot_RIGHT(obj)
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
  
  obj <- createGgplot(Theoph, ggplot2::aes(conc, Wt)) + geom_line()
  ggplot_RIGHT(obj)
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numAxis, 1)
  expect_identical(temp$numLines, 1)
  expect_identical(temp$nameArray, "Theoph")
  expect_identical(temp$divArray, '<div id="container1" oncontextmenu="return false;"></div>')
  expect_identical(temp$scriptArray, c("var axis1 = new Axis(1, Theoph, 'conc', 'Wt', {});",                
                                       "var lineObj1 = new MakeLineObj(Theoph, 'conc', 'Wt', {});",         
                                       "var line1 = new Line(axis1, lineObj1, 'x1', 'x2', 'y1', 'y2', {});"))
  
  obj <- createGgplot(Theoph, ggplot2::aes(Subject, Wt)) + geom_boxplot()
  ggplot_RIGHT(obj)
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
    
  obj <- createGgplot(Theoph, ggplot2::aes(conc, Time, colour=Subject)) + geom_point()
  ggplot_RIGHT(obj)
  temp <- get(".RIGHT", envir = asNamespace("RIGHT"))
  expect_identical(temp$numAxis, 1)
  expect_identical(temp$numPoints, 1)
  expect_identical(temp$numLines, 0)
  expect_identical(temp$nameArray, "Theoph")
  expect_identical(temp$divArray, '<div id="container1" oncontextmenu="return false;"></div>')
  expect_identical(temp$scriptArray, c("var axis1 = new Axis(1, Theoph, 'conc', 'Time', {legend: 'Subject'});",
                                       "var point1 = new Dot(axis1, Theoph, 'conc', 'Time', {});"))
  
  obj <- createGgplot(Theoph, ggplot2::aes(conc, fill=Time)) + geom_bar()
  ggplot_RIGHT(obj)
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