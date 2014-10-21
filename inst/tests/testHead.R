context("Test head.R")

## ---
## Test sourcing related functions:
## ---

test_that("addSource() should only take a character vector", {
  
  expect_error(addSource(1))
  
}) # test_that

setRIGHT(sourceArray = c())

test_that("Check adding scripts to source", {
  
  addSource("common.js")
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$sourceArray, 
                   "common.js")
  
  addSource()
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$sourceArray, 
                   "common.js")
  
  addSource(c("structure.js", "event.js"))
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$sourceArray, 
                   c("common.js", "structure.js", "event.js"))
  
  # Repeated values are allowed:
  addSource("common.js")
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$sourceArray, 
                   c("common.js", "structure.js", "event.js", "common.js"))
  
}) # test_that

test_that("Test script creation with createSource()", {
  
  setRIGHT(flagServer = FALSE)
  
  expect_identical(createSource(), NULL)
  expect_identical(createSource(c()), NULL)
  expect_identical(createSource(c("A", "B", "", "A")),
                   c('<script src="/A" type="text/javascript"></script>',
                     '<script src="/B" type="text/javascript"></script>',
                     '<script src="data.js" type="text/javascript"></script>'))
  
}) # test_that

## ---
## Test linking related functions:
## ---

test_that("addLink() should only take a character vector", {
  
  expect_error(addLink(1))
  
}) # test_that

setRIGHT(linkArray = c())

test_that("Check adding links to source", {
  
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$linkArray , 
                   c())
  
  addLink("shared/shiny.css")
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$linkArray, 
                   "shared/shiny.css")
  
  addLink()
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$linkArray, 
                   "shared/shiny.css")
  
  addLink(c("right.css", "shared/slider/css/jquery.slider.min.css"))
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$linkArray, 
                   c("shared/shiny.css", "right.css", "shared/slider/css/jquery.slider.min.css"))
  
  # Repeated values are allowed:
  addLink("right.css")
  expect_identical(get(".RIGHT", envir = asNamespace("RIGHT"))$linkArray, 
                   c("shared/shiny.css", "right.css", "shared/slider/css/jquery.slider.min.css", "right.css"))
  
}) # test_that

test_that("Test script creation with createLink()", {
  
  setRIGHT(flagServer = FALSE)

  expect_identical(createLink(), NULL)
  expect_identical(createLink(c()), NULL)
  expect_identical(createLink(c("A", "B", "", "A")),
                   c('<link rel="stylesheet" type="text/css" href="/A"/>',
                     '<link rel="stylesheet" type="text/css" href="/B"/>'))
  
}) # test_that

## ---
## Test createHead():
## ---

setRIGHT(linkArray = c(),
         sourceArray = c())

test_that("Test script creation with createHead()", {
  
  expect_identical(createHead("NOTHING & EMPTY"),
                   c("<head>",
                     "",
                     '  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>',
                     "",
                     "  <title>NOTHING &amp; EMPTY</title>",
                     "",
                     "</head>"))
  
  setRIGHT(linkArray = "right.css",
           sourceArray = c())
  
  expect_identical(createHead("LINK< GIVEN"),
                   c("<head>",
                     "",
                     '  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>',
                     "",
                     '  <link rel="stylesheet" type="text/css" href="/right.css"/>',
                     "",
                     "  <title>LINK&lt; GIVEN</title>", 
                     "",
                     "</head>"))
  
  setRIGHT(linkArray = "right.css",
           sourceArray = "common.js")
  
  expect_identical(createHead("BOTH GIVEN"),
                   c("<head>",
                     "",
                     '  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>',
                     "",
                     '  <link rel="stylesheet" type="text/css" href="/right.css"/>',
                     "",
                     "  <title>BOTH GIVEN</title>", 
                     "",
                     '  <script src="/common.js" type="text/javascript"></script>',
                     '  <script src="data.js" type="text/javascript"></script>',
                     "",
                     "</head>"))
  
}) # test_that
