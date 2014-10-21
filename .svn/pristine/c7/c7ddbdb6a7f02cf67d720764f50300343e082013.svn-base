#' @title Pie Charts
#' 
#' @description Draw a pie chart.
#'
#' @param x variable name for which the histogram is desired.
#' @param data a data.frame object.
#' @param isString a character is expected for \code{x} and \code{data} if \code{TRUE}. It is useful for programming.
#'
#' @seealso \code{\link{pie}}
#' 
#' @export
#' 
#' @examples
#' \donttest{
#' obj <- RIGHT(pie(Subject, Theoph))
#' print(obj)
#' }
pie_RIGHT <- function(x, data, isString = FALSE) {
  
  ## ---
  ## Take strings if asked:
  ## ---
  
  argArray <- as.list(match.call())

  if (!isString) {
    
    .RIGHT$curDataObj <- argArray$data
    x <- if (is.null(argArray$x)) NULL else as.character(argArray$x)
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
  checkColumnName(x, dataArray)
  
  ## ---
  ## Create a pie chart:
  ## ---
  
  # Keep name of the data object:
  .RIGHT$nameArray <- append(.RIGHT$nameArray, data)

  # Increment the number of axes and pie charts:
  .RIGHT$numAxis <- .RIGHT$numAxis + 1
  .RIGHT$numPie <- .RIGHT$numPie + 1
  
  # Add div in body:
  .RIGHT$divArray <- append(.RIGHT$divArray, 
                            paste0('<div id="container', .RIGHT$numAxis,
                                   '" oncontextmenu="return false;"></div>'))
  
  # Add script in body:
  .RIGHT$scriptArray <- append(.RIGHT$scriptArray,
                               c(paste0("var pieObj", .RIGHT$numPie,
                                        " = new ddply(", data, 
                                        ", ['", x, "'], {});"),
                                 paste0("var axis", .RIGHT$numAxis,
                                        " = new Axis(", .RIGHT$numAxis, 
                                        ", pieObj", .RIGHT$numPie, # pie object is used to set axis
                                        ", '", x, "', '", 'frequency', 
                                        "', {legend: '", x, "'});"),
                                 paste0("var pie", .RIGHT$numPie,
                                        " = new Pie(axis", .RIGHT$numAxis,
                                        ", pieObj", .RIGHT$numPie,
                                        ", '", x, "', 'frequency', {});")))
  
  # Source pie.js in head:
  addSource("pie.js")
  
} # function pie_RIGHT
