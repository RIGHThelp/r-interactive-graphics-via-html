#' @title Histograms
#' 
#' @description Draw a histogram of the given data values.
#' 
#' @param x variable name for which the histogram is desired.
#' @param data a data.frame object.
#' @param color column used to define the colors used to fill the bars. Default is NULL.
#' @param isString a character is expected for \code{x}, \code{data} and \code{color} if \code{TRUE}. It is useful for programming.
#' 
#' @seealso \code{\link{hist}}
#' @export
#' 
#' @examples
#' \donttest{
#' obj <- RIGHT(hist(Time, Theoph, color = Subject))
#' print(obj)
#' }
hist_RIGHT <- function(x, data, color = NULL, isString = FALSE) {
  
  ## ---
  ## Take strings if asked:
  ## ---
  
  argArray <- as.list(match.call())
  
  if (!isString) {
    
    .RIGHT$curDataObj <- argArray$data
    x <- if (is.null(argArray$x)) NULL else as.character(argArray$x)
    data <- if (is.null(argArray$data)) NULL else as.character(argArray$data)
    color <- if (is.null(argArray$color)) NULL else as.character(argArray$color)
    
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
  checkColumnName(x, dataArray)

  # Check color option:
  checkColumnName(color, dataArray)
  
  ## ---
  ## Create a histogram:
  ## ---

  # Keep name of the data object:
  .RIGHT$nameArray <- append(.RIGHT$nameArray, data)
  
  # Increment the number of axes and histograms:
  .RIGHT$numAxis <- .RIGHT$numAxis + 1
  .RIGHT$numHist <- .RIGHT$numHist + 1
  
  # Add div in body:
  .RIGHT$divArray <- append(.RIGHT$divArray, 
                            paste0('<div id="container', .RIGHT$numAxis,
                                   '" oncontextmenu="return false;"></div>'))
  
  # Add script in body:
  .RIGHT$scriptArray <- append(.RIGHT$scriptArray,
                               c(paste0("var histObj", .RIGHT$numHist,
                                        " = new ddply(", data, 
                                        ", ", createArray(unique(c(x, color)), alwaysArray = TRUE), ", {});"),
                                 paste0("var axis", .RIGHT$numAxis,
                                        " = new Axis(", .RIGHT$numAxis, 
                                        ", histObj", .RIGHT$numHist, # hist object is used to set axis
                                        ", '", x, 
                                        "', 'frequency', ", createObject(legend = color, alwaysObject = TRUE), ");"),
                                 paste0("var hist", .RIGHT$numHist,
                                        " = new Bar(axis", .RIGHT$numAxis,
                                        ", histObj", .RIGHT$numHist,
                                        ", '", x, "', 'frequency', {});")))
  
  # Source bar.js in head:
  addSource("bar.js")
  
} # function hist_RIGHT
