#' @title Add an Interactive Table
#'
#' @description table_RIGHT adds an interactive table for a \code{data.frame} object.
#' 
#' @param data a data.frame object.
#' @param height height of the table. The default is 200.
#' @param isString a character is expected for \code{data} if \code{TRUE}. It is useful for programming.
#' 
#' @export
#' 
#' @examples
#' \donttest{
#' obj <- RIGHT({plot(conc ~ Time, Theoph, type = "p", color = Subject)
#'               table(Theoph)})
#' print(obj)
#' }
table_RIGHT <- function(data, height = 200L, isString = FALSE) {
  
  ## ---
  ## Take strings if asked:
  ## ---
  
  # Make sure that data exists:
  argArray <- as.list(match.call())
  
  if (!isString) {
    
    data <- if (is.null(argArray$data)) NULL else as.character(argArray$data)
    
  } # if
  
  ## ---
  ## Check input arguments:
  ## ---
  
  # get is necessary in case a character string is given for data:
  if (!exists(data, envir = parent.frame())) {
    stop(data, " does not exist.")
  } # if
  
  if (!is.numeric(height) || (is.numeric(height) && height != as.integer(height)) || length(height) != 1) {
    stop("height should be an integer.")
  } # if
  
  ## ---
  ## Create a search box:
  ## ---
  
  # Keep name of the data object:
  .RIGHT$nameArray <- append(.RIGHT$nameArray, data)
  
  # Increment the number of search boxes:
  .RIGHT$numTable <- .RIGHT$numTable + 1
  
  # Add script in body: 
  .RIGHT$scriptArray <- append(.RIGHT$scriptArray, 
                            paste0('makeTable("table', .RIGHT$numTable,
                                   '", ', data,
                                   ', ', height, ');'))
  
  # Source dot.js in head:
  addSource("table.js")
  
  invisible()
  
} # function table_RIGHT
