## ---
## Manipulate .RIGHT environment variable:
## ---

# This function is most useful for testing the code, making it possible to run both testthat and 
# R CMD check while avoiding "cannot changee value of locked binding" error.

# This function has side effects.
clearRIGHT <- function() {
  rm(list = ls(envir = .RIGHT), envir = .RIGHT)
} # function clearRIGHT

# This function has side effects.
setRIGHT <- function(...) {
  
  varList <- list(...)
  
  nameArray <- names(varList)
  if (is.null(nameArray) || any(nameArray == "")) {
    stop("All arguments should have a name.")
  } # if
  
  numVar <- length(nameArray)
  for (iVar in 1:numVar) {
    .RIGHT[[nameArray[iVar]]] <- varList[[iVar]] # note that <- is used instead of <<-
  } # for
  
  invisible()
  
} # function setRIGHT

## ---
## Functions to check input arguments:
## ---
checkFormula_xy <- function(form) {

  if (length(form) != 3 || !is.name(form[[2]]) || !is.name(form[[3]])) {
    stop("form should be y ~ x where x and y are column names.")
  } # if

  return(list(x = as.character(form[[3]]), 
              y = as.character(form[[2]])))
  
} # function checkFormula_xy

checkFormula_x <- function(form) {

  # x ~ is not possible, only ~ x is, for length 2 case:
  if ((length(form) == 2 && !is.name(form[[2]])) ||
        (length(form) == 3 && (!is.name(form[[2]]) || !is.name(form[[3]]) || form[[2]] != "."))) {
    stop("form should be ~ x (or . ~ x) where x is a column name.")
  } # if
  
  return(list(x = as.character(form[[length(form)]])))
  
} # function checkFormula_x

checkColumnName <- function(axisName, dataArray) {
  
  if (!is.null(axisName) && !is.element(axisName, names(dataArray))) {
    stop(axisName, " column does not exist.")
  } # if
  
  invisible()
  
} # function checkColumnName

checkCol <- function(col) {

  if (!is.null(col)) {
    
    if (!(is.character(col) && length(col) == 1) &&
          !(is.numeric(col) && length(col) == 3)) {
      stop("col should be a single color name or a RGB vector.")
    } # if
    
  } # if
  
  invisible()
  
} # function checkCol

getRGB <- function(col) {
  
  if (is.character(col)) {
    col <- col2rgb(col)
  } # if
  
  return(if (is.null(col)) NULL else as.integer(col))
  
} # function getRGB

## ---
## Functions to create options in JavaScript:
## ---

createArray <- function(valueArray = NULL, alwaysArray = FALSE) {
  
  returnArray <- NULL
  
  # This also takes care of c():
  if (is.null(valueArray)) {
    
    if (alwaysArray == TRUE) {
      returnArray <- "[]"
    } # if
    
  } else {
    
    # Factor needs special treatment since is.vector() returns false:
    if (is.factor(valueArray)) {
      valueArray <- as.vector(valueArray)
    } # if
    
    # CHECK (junghoon): is there a better condition to check?
    if (!is.vector(valueArray) || is.list(valueArray) || is.expression(valueArray)) {
      stop("valueArray should be an atomic vector.")
    } # if
    
    # Surround characters with single quotes:
    if (is.character(valueArray)) {
      valueArray <- paste0("'", valueArray, "'")
    } # if
    
    if (length(valueArray) == 1 && alwaysArray == FALSE) {
      returnArray <- as.character(valueArray)
    } else {
      returnArray <- paste0("[", 
                            paste0(valueArray, collapse = ", "),
                            "]")
    } # if
    
    # JavaScript uses true and false:
    if (is.logical(valueArray)) {
      returnArray <- tolower(returnArray)
    } # if
    
  } # if
  
  return(returnArray)
  
} # function createArray

createObject <- function(..., fieldList = NULL, alwaysObject = FALSE, alwaysArray = FALSE) {

  if (!is.null(fieldList) && !is.list(fieldList)) {
    stop("fieldList should be a list.")
  } # if
  
  fieldList <- c(list(...), fieldList)
  fieldList <- Filter(Negate(is.null), fieldList) # remove all null entries
  
  if (length(fieldList) == 0) {
    if (alwaysObject == TRUE) {
      return("{}")
    } else {
      return(NULL)
    } # if
  } # if
  
  # Check whether names are given:
  nameArray <- names(fieldList)
  if (is.null(nameArray) || any(nameArray == "")) {
    stop("All arguments and entries of fieldList should have a name.")
  } # if
  
  numField <- length(nameArray)
  if (numField != length(unique(nameArray))) {
    stop("Some field names are repeated.")
  } # if
  
  # sapply cannot be used since names are necessary:
  charArray <- vector("character", numField)
  for (iField in 1:numField) {

    # Convert the value to string:
    field <- fieldList[[iField]]
    if (is.list(field)) {
      tempArray <- createObject(fieldList = field, alwaysObject = alwaysObject, alwaysArray = alwaysArray)
    } else {
      tempArray <- createArray(field, alwaysArray = alwaysArray)
    } # if
    
    # Add field name:
    if (!is.null(tempArray)) {
      charArray[[iField]] <- paste0(nameArray[iField], ": ", tempArray)
    } else {
      charArray[[iField]] <- ""
    }# if
    
  } # for
  
  # Keep only non-empty strings:
  charArray <- Filter(function(x) x != "", charArray)
  
  return(paste0("{", 
                paste0(charArray, collapse = ", "),
                "}"))
  
} # function createObject
