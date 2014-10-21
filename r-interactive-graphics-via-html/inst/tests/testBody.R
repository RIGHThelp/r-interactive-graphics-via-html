context("Test body.R")

## ---
## Test addBlankLine():
## ---

setRIGHT(scriptArray = c("LINE"))

test_that("Test blank line insertion", {
  
  appendBlankLine()
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$scriptArray, c("LINE", 
                                                                              ""))
  
  appendBlankLine(2)
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$scriptArray, c("LINE", 
                                                                              rep("", 3)))
  
  prependBlankLine()
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$scriptArray, c("", 
                                                                              "LINE", 
                                                                              rep("", 3)))

  prependBlankLine(2)
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$scriptArray, c(rep("", 3), 
                                                                              "LINE", 
                                                                              rep("", 3)))
  
}) # test_that

## ---
## Test prepareData():
## ---

A <- data.frame(ID = 1:10, NAME = letters[1:10])
B <- data.frame(VALUE = 1:5)

test_that("Check whether data.frame objects are properly saved", {

  prepareData(list(A = A, B = B))
  expect_true(file.exists(file.path("www", "data.js")))
  
  unlink("www", recursive = TRUE)
}) # test_that

test_that("Check whether data.frame objects can be saved in another directory", {
  
  dir.create("TEMP")
  prepareData(list(A = A), "TEMP")  
  expect_true(file.exists(file.path("TEMP", "www","data.js")))
  
  unlink("TEMP", recursive = TRUE)
  
}) # test_that

## ---
## Test loadData():
## ---

setRIGHT(scriptArray = c())

test_that("Test script generation for loading data", {
  
  loadData("A")
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$structArray, 
                   paste0('var A = createMainStructureE(A);'))
  
  loadData()
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$structArray, 
                   paste0('var A = createMainStructureE(A);'))
  
  expect_error(loadData(c("B", "C"), "data.js"))
  
  loadData(c("B", "C"))
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$structArray, 
                   c("var A = createMainStructureE(A);",
                     "var B = createMainStructureE(B);",
                     "var C = createMainStructureE(C);"))      
}) # test_that

## ---
## Test addDrawTrigger():
## ---

setRIGHT(scriptArray = c())

test_that("Test draw trigger script generation", {
  
  addDrawTrigger()
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$scriptArray, c())
  
  addDrawTrigger("A")
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$scriptArray, "A.draw();")
  
  addDrawTrigger(c("B", "C"))
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$scriptArray, 
                   c("A.draw();", "B.draw();", "C.draw();"))
  
})
## ---
## Test addEventTrigger():
## ---

setRIGHT(scriptArray = c())

test_that("Test event trigger script generation", {
  
  addEventTrigger()
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$scriptArray, c())
  
  addEventTrigger(0)
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$scriptArray, c())
  
  addEventTrigger(1)
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$scriptArray, 
                   "var AllAxisObjArr = [axis1]; eventTrigger(AllAxisObjArr);")
  
  addEventTrigger(3)
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$scriptArray, 
                   c("var AllAxisObjArr = [axis1]; eventTrigger(AllAxisObjArr);", 
                     "var AllAxisObjArr = [axis1, axis2, axis3]; eventTrigger(AllAxisObjArr);"))
  
}) # test_that

## ---
## Test createDiv():
## ---

setRIGHT(structArray = c(),
         numSearch = 0)

test_that("Test div block generation:", {
  
  expect_identical(createDiv(), NULL)
  expect_identical(createDiv(c()), NULL)
  expect_identical(createDiv(c("A", "B")),
                   c(paste0('<div id="content">\n<div id="content1" class="right-output">\nA</div>\n',
                            '<div id="content2" class="right-output">\nB</div>\n'), "</div>"))
  
  setRIGHT(numAxis = 3,
           offIndex = c(1, 1),
           offNameArr = c("A", "B"))

  expect_identical(createDiv(c("div1", "div2", "div3") , TRUE),
                   c(paste0('<div id="content">\n<div id="A" class="right-output">\n<div id="B" class="right-output">\ndiv1</div></div>\n',
                            '<div id="content2" class="right-output">\ndiv2</div>\n',
                            '<div id="content3" class="right-output">\ndiv3</div>\n'), "</div>"))
  
  setRIGHT(offIndex = c(1, 3))
  expect_identical(createDiv(c("div1", "div2", "div3") , TRUE),
                   c(paste0('<div id="content">\n',
                            '<div id="A" class="right-output">\ndiv1</div>\n',
                            '<div id="content2" class="right-output">\ndiv2</div>\n',
                            '<div id="B" class="right-output">\ndiv3</div>\n'), "</div>"))
                   
}) # test_that

## ---
## Test createScript():
## ---

test_that("Test script block generation", {
  
  expect_identical(createScript(), NULL)
  expect_identical(createScript(c()), NULL)
  expect_identical(createScript(c("A", "B")),
                   c("<script>",
                     "  A",
                     "  B",
                     "</script>"))
  
}) # test_that

## ---
## Test createBody():
## ---

setRIGHT(divArray = c(),
         scriptArray = c())

test_that("Check body block generation", {
  
  expect_identical(createBody(),
                   c("<body>",
                     "",
                     '  <div id="footer">',
                     '  <p id="copyright">&copy; 2014 - <a href="#">The RIGHT team</a></p>',
                     '  <p id="dont-delete-this">E-mail : <a href="mailto:right-user@googlegroups.com">right-user@googlegroups.com</a></p>',
                     "  </div>",
                     "",
                     "</body>"))
  
  setRIGHT(divArray = c("A", "B"),
           flagServer = FALSE,
           scriptArray = c())
  
  expect_identical(createBody(),
                   c("<body>",
                     "",
                     '  <div id="content">\n<div id="content1" class="right-output">\nA</div>\n<div id="content2" class="right-output">\nB</div>\n',
                     "  </div>",
                     "",
                     '  <div id="footer">',
                     '  <p id="copyright">&copy; 2014 - <a href="#">The RIGHT team</a></p>',
                     '  <p id="dont-delete-this">E-mail : <a href="mailto:right-user@googlegroups.com">right-user@googlegroups.com</a></p>',
                     "  </div>",
                     "",
                     "</body>"))
  
  setRIGHT(divArray = c("A", "B"),
           scriptArray = c("C", "D"))
  
  expect_identical(createBody(),
                   c("<body>",
                     "",
                     '  <div id="content">\n<div id="content1" class="right-output">\nA</div>\n<div id="content2" class="right-output">\nB</div>\n',
                     "  </div>",
                     "",
                     "  <script>",
                     "    C",
                     "    D",
                     "  </script>",
                     "",
                     '  <div id="footer">',
                     '  <p id="copyright">&copy; 2014 - <a href="#">The RIGHT team</a></p>',
                     '  <p id="dont-delete-this">E-mail : <a href="mailto:right-user@googlegroups.com">right-user@googlegroups.com</a></p>',
                     "  </div>",
                     "",
                     "</body>"))
  
}) # test_that