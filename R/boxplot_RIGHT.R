#' @title Box-whisker
#' 
#' @description Draw a box-whisker of the given data values.
#' 
#' @param form a formula describing the x and y variables as y ~ x.
#' @param data a data.frame object.
#' @param col color of the boxes. 
#' @param isString a character is expected for \code{x} and \code{data} if \code{TRUE}. It is useful for programming.
#' 
#' @seealso \code{\link{boxplot}}
#' 
#' @export
#' 
#' @examples
#' \donttest{
#' obj <- RIGHT(boxplot(conc ~ Subject, Theoph))
#' print(obj)
#' }
boxplot_RIGHT <- function(form, data, col = NULL, isString = FALSE) {

  ## ---
  ## Take strings if asked:
  ## ---
  
  argArray <- as.list(match.call())
  
  if (!isString) {
    
    .RIGHT$curDataObj <- argArray$data
    data <- if (is.null(argArray$data)) NULL else as.character(argArray$data)
    
  } # if
    
  ## ---
  ## Check input arguments:
  ## ---
  
  # get is necessary in case a character string is given for data:
  if (!exists(data, envir = parent.frame())) {
    stop(data, " does not exist.")
  } # if
  dataArray <- get(data, envir = parent.frame(), inherits = TRUE)
    
  # Check whether the columns exist:
  # CHECK (junghoon): is there a way to check whether form is a formula?
  axisName <- checkFormula_xy(form) 
  checkColumnName(axisName$x, dataArray)
  checkColumnName(axisName$y, dataArray)
  
  ## ---
  ## Create a box-whisker:
  ## ---
  
  # Keep name of the data object:
  .RIGHT$nameArray <- append(.RIGHT$nameArray, data)

  # Increment the number of axes and Box-whisker:
  .RIGHT$numAxis <- .RIGHT$numAxis + 1
  .RIGHT$numBox <- .RIGHT$numBox + 1
  
  # Add div in body:
  .RIGHT$divArray <- append(.RIGHT$divArray, 
                            paste0('<div id="container', .RIGHT$numAxis,
                                   '" oncontextmenu="return false;"></div>'))
  
  # Add script in body:
  .RIGHT$scriptArray <- append(.RIGHT$scriptArray,
                               c(paste0("var boxObj", .RIGHT$numBox,
                                        " = new MakeBoxObj(", data,
                                        ", ['", axisName$x, "'], ['", axisName$y, "'], {});"),
                                 paste0("var axis", .RIGHT$numAxis,
                                        " = new Axis(", .RIGHT$numAxis, 
                                        ", boxObj", .RIGHT$numBox, # box object is used to set axis
                                        ", '", axisName$x, "', '", axisName$y, "', {});"),
                                 paste0("var box", .RIGHT$numBox,
                                        " = new Box(axis", .RIGHT$numAxis,
                                        ", boxObj", .RIGHT$numBox,
                                        ", ", createObject(baseColor = col, alwaysObject = TRUE), ");")))
  
  # Source box.js in head:
  addSource("box.js")
  
} # function boxplot_RIGHT
